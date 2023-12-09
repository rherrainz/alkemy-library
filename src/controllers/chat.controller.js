import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// En este caso de prueba, Se paso por query params el id, nombre y apellido, normalmente son datos que se deberian obtener desde el middleware.
// TODO: Eliminar el comentario de req.user y eliminar req.query
const chat = (req, res, next) => {
  // const user = req.user;
  const user = req.query;
  const userData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  res.render(join(__dirname, "../public", "chat.handlebars"), {
    userData,
    layout: false,
  });
};

export const ChatController = {
  chat,
};
