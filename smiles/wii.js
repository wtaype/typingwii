// INFORMACIÓN DEL APP 
export let id = 'typingwii';
export let app = 'TypingWii';
export let desc = 'Juego para practicar mecanografía';
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v15';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [MAIN] (1)
git add . ; git commit -m "Actualizacion Principal v15.10.10" ; git push origin main

//  Actualizar versiones de seguridad [TAG NUEVO] (2)
git tag v15 -m "Version v15" ; git push origin v15

// Actualizar versiones de seguridad [TAG REMPLAZO] (3)
git tag -d v15 ; git tag v15 -m "Version v15 actualizada" ; git push origin v15 --force

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (4)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main


 ACTUALIZACION TAG[END] */