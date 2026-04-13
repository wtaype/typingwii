/**
 * subir.js — Módulo Carga de Datos (Excel) - Admin
 * Permite subir un Excel, previsualizarlo y guardarlo/actualizarlo en Firestore
 */

import './subir.css';
import './admin.css'; 
import $ from 'jquery';
import * as ExcelJS from 'exceljs';
import { getls, Mensaje } from '../../widev.js';
import { db } from '../firebase.js';
import { doc, getDoc, setDoc, writeBatch, Timestamp, collection, query, where, getDocs, documentId } from 'firebase/firestore';

const wi = () => getls('wiSmile');
const guard = () => wi()?.rol === 'admin';

let excelData = [];
const mapastb = {
  'DOC. IDENTIDAD': 'dni',
  'EMPRESA': 'empresa',
  'CODIGO': 'codigo',
  'ID. SPARTA': 'idsparta',
  'APELLIDOS Y NOMBRES': 'nombres',
  'F. INGRESO': 'fechaIngreso',
  'FECHA TERMINO': 'fechaTermino',
  'TIPO CONTRATO': 'TipoContrato',
  'RESPONSABLE': 'responsable',
  'GRUPO': 'grupo',
  'CAMP. CC': 'campcc',
  'CENTRO DE COSTO': 'centroCosto',
  'CARGO': 'cargo',
  'CARGO OPERACIONES': 'cargoOperaciones',
  'TIPO DE LABOR': 'TipoLabor',
  'SEDE': 'sede',
  'TELEFONO': 'telefono',
  'E-MAIL': 'email',
  'SEXO': 'sexo',
  'FECHA DE NACIMIENTO': 'fechaNacimiento',
  'DIRECCIÓN': 'direccion',
  'DISTRITO': 'distrito',
  'ROL': 'rol',
};
const camposFecha = ['fechaIngreso', 'fechaTermino', 'fechaNacimiento'];

// ─── RENDER ───────────────────────────────────────────────────────
export const render = async () => {
  if (!guard()) return `<div class="sb_wrap"><div class="rl_empty"><i class="fas fa-lock"></i><p>Sin acceso.</p></div></div>`;
  return `
  <div class="sb_wrap" id="sb_root">
    
    <div class="sb_hero">
      <div class="sb_hero_icon"><i class="fas fa-file-excel"></i></div>
      <div class="sb_hero_txt">
        <h2>Carga Masiva de Datos</h2>
        <p>Sube la plantilla Excel para crear o actualizar empleados masivamente</p>
      </div>
    </div>

    <!-- ZONA UPLOAD -->
    <div class="sb_card">
      <div class="sb_file_box">
        <i class="fas fa-cloud-upload-alt"></i>
        <span>Haz clic aquí o arrastra tu archivo Excel (.xlsx)</span>
        <small>Solo se procesará la primera hoja. Asegúrate de tener los encabezados correctos.</small>
        <input type="file" id="sb_file" accept=".xlsx, .xls">
      </div>
      <div id="sb_filename" class="sb_d_none"></div>
    </div>

    <!-- VISTA PREVIA -->
    <div class="sb_card sb_d_none" id="sb_preview_card">
      <div class="sb_section_title"><i class="fas fa-table"></i> Vista Previa de Datos</div>
      <div id="sb_loading"><i class="fas fa-spinner fa-spin"></i> Analizando comprobando BD...</div>
      
      <div class="sb_table_wrapper sb_d_none" id="sb_table_wrap">
        <table class="sb_table" id="sb_table">
          <thead><tr></tr></thead>
          <tbody></tbody>
        </table>
      </div>
      
      <div id="sb_summary"></div>

      <div class="sb_actions">
        <button class="sb_btn" id="sb_btn_cancel"><i class="fas fa-times"></i> Cancelar</button>
        <button class="sb_btn primary" id="sb_btn_upload"><i class="fas fa-cloud-upload-alt"></i> Subir a Firebase</button>
      </div>
    </div>

  </div>`;
};

// ─── UTILIDADES ───────────────────────────────────────────────────

const procesarFecha = (cellValue) => {
  if (!cellValue) return { display: '', timestamp: null };
  let fecha;
  if (typeof cellValue === 'number') {
    fecha = new Date(Math.round((cellValue - 25569) * 86400 * 1000));
  } else if (cellValue && typeof cellValue === 'object' && cellValue.result !== undefined) {
    fecha = new Date(cellValue.result);
  } else if (cellValue instanceof Date) {
    fecha = cellValue;
  } else if (typeof cellValue === 'string') {
    if (cellValue.includes('/') || cellValue.includes('-')) {
      const partes = cellValue.split(/[\/\-]/);
      if (partes.length === 3) {
        if (partes[2].length === 4) {
          fecha = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
          if (isNaN(fecha.getTime())) fecha = new Date(parseInt(partes[2]), parseInt(partes[0]) - 1, parseInt(partes[1]));
        } else if (partes[0].length === 4) {
          fecha = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
        }
      }
    } else {
      fecha = new Date(cellValue);
    }
  }
  if (!fecha || isNaN(fecha.getTime())) return { display: '', timestamp: null };
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return { display: `${yyyy}-${mm}-${dd}`, timestamp: Timestamp.fromDate(fecha) };
};

// ─── LÓGICA PRINCIPAL ─────────────────────────────────────────────

const leerExcel = async (file) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.worksheets[0];
    if (!worksheet) throw new Error("No se encontró ninguna hoja");

    const headers = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      if (cell.value) headers[colNumber] = cell.value.toString().trim();
    });

    excelData = [];
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      if (!row.hasValues) continue;
      const rowData = {};
      let hasDNI = false;
      
      headers.forEach((header, colNumber) => {
        if (header && mapastb[header]) {
          const fieldName = mapastb[header];
          let value = row.getCell(colNumber).value;
          if (fieldName === 'dni' && value) {
            hasDNI = true;
            value = value.toString().trim().toLowerCase();
          } else if (camposFecha.includes(fieldName)) {
            const f = procesarFecha(value);
            rowData[`${fieldName}_timestamp`] = f.timestamp;
            value = f.display;
          } else if (typeof value === 'string') {
            value = value.trim().toLowerCase();
          }
          rowData[fieldName] = value || '';
        }
      });
      if (hasDNI) excelData.push(rowData);
    }

    // ─── VALIDACIÓN PREVIA (CHUNKS DE 30) ───
    // Firebase solo permite queries 'in' de hasta 30 elementos.
    // Esto ahorra miles de lecturas agrupando las comprobaciones.
    const allDnis = excelData.map(e => e.dni).filter(Boolean);
    const existingDnis = new Set();
    
    if (allDnis.length > 0) {
      const CHUNK_SIZE = 30;
      for (let i = 0; i < allDnis.length; i += CHUNK_SIZE) {
        const chunk = allDnis.slice(i, i + CHUNK_SIZE);
        const qRef = query(collection(db, 'smiles'), where(documentId(), 'in', chunk));
        const snap = await getDocs(qRef);
        snap.forEach(docSnap => existingDnis.add(docSnap.id));
      }
    }

    excelData.forEach((_, index) => {
      const d = excelData[index].dni;
      excelData[index].estado_original = existingDnis.has(d) ? 'actualizar' : 'nuevo';
    });
    
    return { success: true, data: excelData };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const generarTabla = (datos) => {
  const $th = $('#sb_table thead tr').empty();
  const $tb = $('#sb_table tbody').empty();
  if (!datos.length) return;

  const keys = Object.values(mapastb);
  if (!keys.includes('distrito')) keys.push('distrito');
  if (!keys.includes('rol')) keys.push('rol');
  if (!keys.includes('estado')) keys.push('estado');
  keys.push('bd_action'); // Columna especial visual

  // Crear Heads
  keys.forEach(k => {
    const lbl = k === 'bd_action' ? 'Acción' : k.toUpperCase();
    $th.append(`<th>${lbl}</th>`);
  });

  // Crear Rows
  datos.forEach((fila, idx) => {
    const tr = $('<tr>');
    fila.rol = fila.rol || 'smile';
    fila.estado = 'activo'; // Para obligar que entren activos
    
    keys.forEach(key => {
      const td = $('<td>');
      
      if (key === 'bd_action') {
        const st = fila.estado_original; // 'nuevo' o 'actualizar'
        const lbl = st === 'nuevo' ? 'Nuevo' : 'Actualizar';
        const ico = st === 'nuevo' ? 'fa-file-excel' : 'fa-info-circle';
        td.html(`
          <div style="display:flex; align-items:center; gap:1vh;">
            <span class="sb_badge ${st}"><i class="fas ${ico}"></i> ${lbl}</span>
            <button class="sb_btn_del_row" data-idx="${idx}" title="Remover de la lista"><i class="fas fa-times"></i></button>
          </div>
        `);
        tr.append(td);
        return;
      }
      
      let valor = fila[key] || '';
      
      if (camposFecha.includes(key)) {
        const $inp = $('<input>', { type: 'date', value: valor })
          .on('change', function() {
            const nv = $(this).val();
            excelData[idx][key] = nv;
            if (nv) {
              const fp = procesarFecha(nv);
              excelData[idx][`${key}_timestamp`] = fp.timestamp;
            } else {
              excelData[idx][`${key}_timestamp`] = null;
            }
          });
        td.append($inp);
      } else {
        const $txt = $('<textarea>').val(valor)
          .on('change', function() {
            let nv = $(this).val().trim();
            if (key !== 'rol' && key !== 'estado') nv = nv.toLowerCase();
            excelData[idx][key] = nv;
          });
        td.append($txt);
      }
      tr.append(td);
    });
    $tb.append(tr);
  });
  
  $('#sb_summary').html(`<strong>Resumen:</strong> Lote de ${datos.length} registros listos para subir rápidamente a Firebase.`);
  $('#sb_loading').addClass('sb_d_none');
  $('#sb_table_wrap').removeClass('sb_d_none');
};

const subirDatosFirebase = async () => {
  const dataToUpload = excelData.filter(d => d !== null);
  if (!dataToUpload.length) return false;
  $('#sb_btn_upload').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Subiendo...');
  
  try {
    // Firestore permite un máximo de 500 escrituras por cada Batch
    const LOTE_MAX = 500;
    
    for (let i = 0; i < dataToUpload.length; i += LOTE_MAX) {
      const batch = writeBatch(db);
      const chunk = dataToUpload.slice(i, i + LOTE_MAX);
      
      chunk.forEach(emp => {
        const docRef = doc(db, "smiles", emp.dni);
        const data = { ...emp };
        
        camposFecha.forEach(campo => {
          if (emp[`${campo}_timestamp`]) data[campo] = emp[`${campo}_timestamp`];
          delete data[`${campo}_timestamp`];
        });
        delete data.estado_original;
        delete data.bd_action;
        
        data.rol = data.rol || 'smile';
        data.estado = 'activo';
        
        batch.set(docRef, data, { merge: true }); // SET con merge true asegura Update if Exists / Create if Not
      });
      
      await batch.commit();
    }
    
    Mensaje(`Éxito. Subida masiva de ${dataToUpload.length} registros completada.`, 'success');
    return true;
  } catch(e) {
    console.error(e);
    Mensaje(`Error al subir: ${e.message}`, 'error');
    $('#sb_btn_upload').prop('disabled', false).html('<i class="fas fa-cloud-upload-alt"></i> Subir a Firebase');
    return false;
  }
};

// ─── INIT & EVENTOS ───────────────────────────────────────────────

export const init = async () => {
  if (!guard()) return;
  const $fileRow = $('#sb_file');
  
  $fileRow.on('change', async function(e) {
    const file = e.target.files[0];
    if(!file) return;
    
    $('#sb_filename').text(`Archivo: ${file.name}`).removeClass('sb_d_none');
    $('#sb_preview_card').removeClass('sb_d_none');
    $('#sb_table_wrap').addClass('sb_d_none');
    $('#sb_loading').removeClass('sb_d_none');
    $('#sb_btn_upload').prop('disabled', false).removeClass('sb_d_none');
    $('#sb_summary').empty();
    
    const res = await leerExcel(file);
    if(res.success) {
      generarTabla(res.data);
    } else {
      Mensaje(`Error analizando Excel: ${res.error}`, 'error');
      $('#sb_loading').addClass('sb_d_none');
    }
  });
  
  $('#sb_btn_cancel').on('click', () => {
    excelData = [];
    $fileRow.val('');
    $('#sb_filename').addClass('sb_d_none');
    $('#sb_preview_card').addClass('sb_d_none');
  });
  
  $('#sb_btn_upload').on('click', async () => {
    const ok = await subirDatosFirebase();
    if(ok) {
      setTimeout(() => {
        excelData = [];
        $fileRow.val('');
        $('#sb_filename').addClass('sb_d_none');
        $('#sb_preview_card').addClass('sb_d_none');
      }, 2000);
    }
  });

  $(document).on('click.sb', '.sb_btn_del_row', function() {
    const idx = $(this).data('idx');
    excelData[idx] = null; // Anular en RAM manteniendo índices
    $(this).closest('tr').remove(); // Remover visualmente
  });
};

export const cleanup = () => {
  excelData = [];
  $(document).off('.sb');
  $('#sb_file').off('change');
  $('#sb_btn_cancel').off('click');
  $('#sb_btn_upload').off('click');
};
