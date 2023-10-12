import app from "./app";
import { AppDataSource } from "./database/data-source";

const main = async () => {
  try {
    await AppDataSource.initialize();    
    console.log("Conexão com o banco realizada com Sucesso");
    
    app.listen(3000, () => {
      console.log("Server Express rodando na porta 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
