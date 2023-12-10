import "dotenv/config";
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

//Esta constante tendrá los argumentos que se pasan cuando el script se ejecuta desde CMD
const arg = process.argv[2];

//Formateo de fecha para concatenarlo al nombre del backup y evitar la sobreescritura
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;


const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dropboxAccessToken = process.env.DROPBOX_ACCESS_TOKEN;


const outputPath = 'src/backups'; // Ruta relativa al directorio actual
const outputFile = `backup_${formattedDate}.sql`; // Nombre que tendrá el bakcup

const currentDir = process.cwd(); // Obtener el directorio de trabajo actual
const fullOutputPath = path.join(currentDir, outputPath, outputFile); // Ruta completa


//Método para subir la copia de seguridad LOCAL a la nube (DropBox)
const uploadBackupToDropbox = async(fileContent, fileName, accessToken) => {
    const dropboxUrl = 'https://content.dropboxapi.com/2/files/upload';
    const response = await fetch(dropboxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Authorization': `Bearer ${accessToken}`,
            'Dropbox-API-Arg': JSON.stringify({
            path: `/${fileName}`,
            mode: 'add',
            autorename: true,
            mute: false,
            }),
        },
        body: fileContent,
    });

    return response.json();
}

//Método para hacer la copia de seguridad LOCAL
const performBackup = async(fullOutputPath) => {
    try 
    {
        // Comando para realizar la copia de seguridad localmente
        const command = `mysqldump -u "${dbUser}" -p"${dbPassword}" "${dbName}" > "${fullOutputPath}"`;
        
        await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                console.error(`Error al realizar la copia de seguridad: ${stderr}`);
                reject(error);
                } else {
                console.log(`Copia de seguridad realizada con éxito. Guardada en: ${fullOutputPath}`);
                resolve();
                }
            });
        });
        
        // Leer el contenido del archivo de respaldo
        const fileContent = await fs.promises.readFile(fullOutputPath);

        //Subir la copia de seguridad a Dropbox
        const dropboxResponse = await uploadBackupToDropbox(fileContent, outputFile, dropboxAccessToken);

        if(dropboxResponse){
            console.log('Copia de seguridad cargada en Dropbox con éxito:', dropboxResponse);
            // Eliminar el archivo de respaldo local
            await fs.promises.unlink(fullOutputPath);
        } else {
            console.log('Error al intentar subir la copia de seguridad a dropbox:', dropboxResponse);
        }
    } catch (error) 
    {
        console.log(error);
    }
}

//Método exportado para implementarlo en una tarea automatizada
const backup = (arg) => {
    if(arg){
        //Verificar si la ruta existe
        if (!fs.existsSync(path.join(currentDir, outputPath))) {
            console.error(`La ruta ${outputPath} no existe. Crea el directorio antes de ejecutar la copia de seguridad.`);
        } else {
            performBackup(fullOutputPath)
        }
    }
}

backup(arg)

export default backup;