// INFORMACIÓN DEL APP 
export let id = 'typingwii';
export let app = 'TypingWii';
export let desc = 'Juego para practicar mecanografía';
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v14';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [MAIN] (1)
git add . ; git commit -m "Actualizacion Principal v14.10.10" ; git push origin main

//  Actualizar versiones de seguridad [TAG NUEVO] (2)
git tag v14 -m "Version v14" ; git push origin v14

// Actualizar versiones de seguridad [TAG REMPLAZO] (3)
git tag -d v14 ; git tag v14 -m "Version v14 actualizada" ; git push origin v14 --force

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (4)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main


 ACTUALIZACION TAG[END] */