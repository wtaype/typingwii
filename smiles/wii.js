// INFORMACIÓN DEL APP 
export let id = 'typingwii';
export let app = 'TypingWii';
export let desc = 'Juego para practicar mecanografía';
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v16';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [MAIN] (1)
git add . ; git commit -m "Actualizacion Principal v16.10.10" ; git push origin main

//  Actualizar versiones de seguridad [TAG NUEVO] (2)
git tag v16 -m "Version v16" ; git push origin v16

// Actualizar versiones de seguridad [TAG REMPLAZO] (3)
git tag -d v16 ; git tag v16 -m "Version v16 actualizada" ; git push origin v16 --force

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (4)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main


 ACTUALIZACION TAG[END] */