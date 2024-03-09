import net from 'node:net'
import fs from 'node:fs'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
    // return { time: process.hrtime(startTime), ip } // I believe this doesn't do anything
  })
  
  client.on('error', (err) => {
    // throw err   // this doesn't do anything
    client.end()
    callback(err)
  })
}

ping('google.com', (err, info) => {
  if (err) console.error(err)
  else console.log(info)
})

export function obtenerDatosPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ data: 'datos importantes' });
        }, 2000);
    })
}

export function procesarArchivo(callback) {
    const handleWriteFunc = (error) => {
        if (error) {
            console.error('Error guardando archivo:', error.message);
            callback(error);
        }
    
        console.log('Archivo procesado y guardado con éxito');
    }
    const handleReadFunc = (error, contenido) => {
        if (error) {
            console.error('Error leyendo archivo:', error.message);
            callback(error);
        }
    
        const textoProcesado = contenido.toUpperCase();

        fs.promises.writeFile('output.txt', textoProcesado, handleWriteFunc);
  
    }
    
    fs.promises.readFile('input.txt', 'utf8', handleReadFunc);
}

export async function procesarArchivoPromise() {
    let content = '';
    try {
        content = await fs.promises.readFile('input.txt', 'utf8');
        content = contenido.toUpperCase();
    } catch(e) {
        console.error('Error leyendo archivo:', e.message);
        throw e;
    }

    try {
        await fs.promises.writeFile('output.txt', textoProcesado);
        console.log('Archivo procesado y guardado con éxito');
    } catch (e) {
        console.error('Error guardando archivo:', error.message);
        throw e;
    }
}

// procesarArchivo((error, info) => {
//     if (error) console.error(error)
//     else console.log(info)
// })

export async function leerArchivos() {
    // console.time('ReadFiles');
//   const archivo1 = await fs.promises.readSync('archivo1.txt', 'utf8');
//   const archivo2 = await fs.promises.readSync('archivo2.txt', 'utf8');
//   const archivo3 = await fs.promises.readSync('archivo3.txt', 'utf8');

  const [archivo1, archivo2, archivo3] = await Promise.all([
    fs.promises.readSync('archivo1.txt', 'utf8'),
    fs.promises.readSync('archivo2.txt', 'utf8'),
    fs.promises.readSync('archivo3.txt', 'utf8')
  ]).catch(err => {
    console.error(err);
    return [];
  });

//   const [archivo1, archivo2, archivo3] = await Promise.allSettled([
//     fs.promises.readSync('archivo1.txt', 'utf8'),
//     fs.promises.readSync('archivo2.txt', 'utf8'),
//     fs.promises.readSync('archivo3.txt', 'utf8')
//   ]);

//   console.timeEnd('ReadFiles');

  return `${archivo1.value} ${archivo2.value} ${archivo3.value}`
}

leerArchivos();

export async function delay(n) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, n);
    })
}

// delay(3000).then(() => console.log('Hola mundo'));