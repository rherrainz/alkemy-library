import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import path from "path";
import ApiError from "../errors/api.error.js";

const fileTimers = {};
const folderPath = "src/exports";

//Formateo el nombre del archivo
const formatDateTime = (date) => {
  const padZero = (value) => (value < 10 ? `0${value}` : value);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

// Función para generar el csv a partir de datos pasados por parametros
const generateCSV = async (data) => {
  const date = new Date();
  const fileName = `exports_${formatDateTime(date)}.csv`;

  if (!data || data.length === 0) {
    throw new ApiError("No hay datos", 401);
  }

  //Crea la ruta exports
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const tableHeaders = Object.keys(data[0]).map((key) => ({
    id: key,
    title: key,
  }));
  const filePath = path.join(folderPath, fileName);

  // Utilizo csv-writer para crear el archivo csv en la ruta src/exports
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: tableHeaders,
  });
  await csvWriter.writeRecords(data);

  setFileDeletionTimer(filePath);

  return fileName;
};

// Función que se encagra de eliminar el archivo csv
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting the file: ${err.message}`);
    } else {
      console.log(`File deleted: ${filePath}`);
    }
  });
};

// Función que se encarga de eliminar archivos con mas de 5 minutos que hayan quedado durante el reinicio del servidor
const checkAndDeleteOldFiles = () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading the directory: ${err.message}`);
      return;
    }

    const now = new Date().getTime();

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileStats = fs.statSync(filePath);
      const fileCreationTime = fileStats.birthtime.getTime();

      if (now - fileCreationTime > 300000) {
        deleteFile(filePath);
      }
    });
  });
};

// Función que asigna un timer de 5 minutos para cada archivo luego de su creación
const setFileDeletionTimer = (filePath) => {
  if (fileTimers[filePath]) {
    clearTimeout(fileTimers[filePath]);
  }

  fileTimers[filePath] = setTimeout(() => {
    deleteFile(filePath);
    delete fileTimers[filePath];

    checkAndDeleteOldFiles();
  }, 300000);

  console.log(`Deletion timer set for file: ${filePath}`);
};

export default generateCSV;
