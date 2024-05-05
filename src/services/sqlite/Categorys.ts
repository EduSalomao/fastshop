import { SQLStatementArg } from "expo-sqlite";
import db from "./SQLiteDatabase";
import { Category } from "../../interfaces/Category";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE cars;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS categorys (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT);"
  );

  tx.executeSql(
    "SELECT COUNT(*) AS count FROM categorys;",
    [],
    (_, { rows }) => {
      const { count } = rows.item(0);
      if (count === 0) {

        addDefaultCategories(tx);
      }
    },
    (_, error) => {
      console.log("Error checking category table:", error);
      return false;
    }
  );
});

const addDefaultCategories = (tx) => {
  const categories = [
    { name: "Carne", color: "#DC143C" } as Category,
    { name: "Fruta", color: "#FFA500" } as Category,
    { name: "Verdura", color: "#32CD32" } as Category
  ];

  categories.forEach((category) => {
    tx.executeSql(
      "INSERT INTO categorys (name, color) VALUES (?, ?);",
      [category.name, category.color],
      (_, { rowsAffected, insertId }) => {
        if (rowsAffected > 0) console.log(`Category '${category.name}' added with ID: ${insertId}`);
        else console.log(`Error inserting category: ${category.name}`);
      },
      (_, error) => {
        console.log(`Error adding category: ${category.name}`, error);
      }
    );
  });
};

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
export const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO categorys (name, color) values (?, ?);",
        [obj.name, obj.color],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => {
          reject(error); // erro interno em tx.executeSql
          return false; // explicitly return false to fix the type error
        }
      );
    });
  });
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
export const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE categorys SET name?, color?, WHERE id=?;",
        [obj.created_at, obj.product_name, obj.product_category, id],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id); // nenhum registro alterado
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
export const find = (id: SQLStatementArg) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM categorys WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found: id=" + id); // nenhum registro encontrado
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};


/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
export const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM categorys;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
export const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM products WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
