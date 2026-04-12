// INFORMACIÓN DEL APP 
export let id = 'typingwii';
export let app = 'TypingWii';
export let desc = 'Juego para practicar mecanografía';
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v9';

/** ACTUALIZACIÓN PRINCIPAL ONE DEV [MAIN] (1)
git add . ; git commit -m "Actualizacion Principal v9.10.10" ; git push origin main

//  Actualizar versiones de seguridad [TAG NUEVO] (2)
git tag v9 -m "Version v9" ; git push origin v9

// Actualizar versiones de seguridad [TAG REMPLAZO] (3)
git tag -d v9 ; git tag v9 -m "Version v9 actualizada" ; git push origin v9 --force


 ACTUALIZACION TAG[END] */