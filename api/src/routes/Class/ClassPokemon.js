const axios = require("axios");
const validator = require("validator");
const { Type } = require("../../db");


class Models {
  constructor(modelo) {
    this.model = modelo;
  }
  getDb = async (req, res, next) => {
    const array = await this.model.findAll();
    const obj = array.map((dato) => {
      return { Nombre: dato.Nombre, id: dato.Id, imagen: dato.Imagen };
    });
    res.send(obj).status(200);
  };
  getApis = async (req, res, next) => {
    try {
      const axioss = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const array = axioss.data.results.map(async (valor) => {
        const obj = await axios.get(`${valor.url}`);
        return {
          Nombre: obj.data.name,
          id: obj.data.id,
          imagen: obj.data.sprites.front_default,
        };
      });
      const resu = await Promise.all(array);
      
      res.send( resu).status(200);
    } catch (error) {
      next(error);
    }
  };
  postPokemon = async (req, res, next) => {
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen } =req.body;
    const tipo = req.body.tipo;
    const result = await this.model
      .findOrCreate({
        where: {
          Nombre: nombre,
          Vida: vida,
          Fuerza: fuerza,
          Defensa: defensa,
          Velocidad: velocidad,
          Altura: altura,
          Peso: peso,
          Imagen: imagen,
        },
        include: { model: Type }
      }).catch((error) => next(error));

      
    tipo.forEach(async (tip) => {
      const valor = await Type.findOne({ where: { Nombre: tip } });
      !!valor && !!result && result[0].addType(valor);
    });
    res.send(result).status(200);
  };
  getTypes = async (req, res, next) => {
    const result = await this.model.findAll();
    res.send(result).status(200);
  };
  getAll = async (req, res, next) => {
    const value=req.query.next&&req.query.next.valueOf()==='true'
    console.log(value)
    const db = await this.model.findAll({ include: { model: Type } });
    const arrayDb = db.map((dato) => {
      return { Nombre: dato.Nombre, id: dato.Id, imagen: dato.Imagen };
    }); //retorna un nuevo array de objetos con el formato de la ruta principal
    if(!value) {
        const axioss = await axios.get(!value?"https://pokeapi.co/api/v2/pokemon":'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
           const array = axioss.data.results.map(async (valor) => {
              return axios.get(`${valor.url}`)
                  .then((res) => {
                    return {nombre:res.data.name,id:res.data.id,img:res.data.sprites.front_default}}) 
      });
      const resu = await Promise.all(array);
      res.send(arrayDb.concat(resu));
      }
    /* }else{
      const axioss = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");//este endpoint es el que te proporciona la api para hacer el siguiente llamado
      const array = axioss.data.results.map(async (valor) => {
        return axios.get(`${valor.url}`)
            .then((res) => {
              return {nombre:res.data.name,id:res.data.id,img:res.data.sprites.front_default}}) 
        });
      const resu = await Promise.all(array);
      res.send(arrayDb.concat(resu));
    } */
    
  };

  saveType = async (req, res, next) => {
    const result = await this.model.findAll();
    if (result.length === 0) {
      const types = await axios.get("https://pokeapi.co/api/v2/type");
      types.data.results.forEach(async (type) => {
        this.model.create({ Nombre: type.name }).catch((error) => next(error));
      });

      res.send(result).status(200);
    } else {
      res.send(result).status(200);
    }
  };
  getOrder = async (req,res,next)=>{
    const order=req.params.order
    const result = await this.model.findAll();
    const axioss = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const array = axioss.data.results.map(async (valor) => {
      const obj = await axios.get(`${valor.url}`);
      return {
        nombre: obj.data.name,
        id: obj.data.id,
        imagen: obj.data.sprites.front_default,
        Fuerza: obj.data.stats[1].base_stat,
      };
    })
   const  arrayResult = result.concat( await Promise.all(array))
   
    if(order==='asc'){
      res.send( arrayResult.sort((a,b)=>a.fuerza-b.fuerza))
    }else{
       res.send(arrayResult.sort((a,b)=>b.fuerza-a.fuerza)) }

  }
  getById = async (req, res, next) => {
    try {
      if (validator.isUUID(req.params.id)) {
        const result = await this.model.findByPk(req.params.id, {
          include: { model: Type },
        });
        res.send(result).status(200);
      } else {
        const result2 = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/" + req.params.id
        );

        const obj = {
          nombre: result2.data.name,
          id: result2.data.id,
          altura: result2.data.height,
          peso: result2.data.weight,
          vida: result2.data.stats[0].base_stat,
          fuerza: result2.data.stats[1].base_stat,
          defensa: result2.data.stats[2].base_stat,
          velocidad: result2.data.stats[5].base_stat,
          imagen: result2.data.sprites.front_default,
          Tipo: result2.data.types.map((tipo) => {
            return tipo.type.name;
          }),
        };
        res.send(obj).status(200);
      }
    } catch (error) {
      next(error);
    }
  };
  getByName = async (req, res, next) => {
    const name = req.query.name;
    const result = await this.model
      .findOne({ where: { Nombre: name } })
      .catch((error) => next(error));

    try {
      if (!result) {
        const result2 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const send = {
          nombre: result2.data.name,
          id: result2.data.id,
          imagen: result2.data.sprites.front_default,
          tipo:result2.data.types.map((tipo) => {
            return tipo.type.name;
          })
        };
        res.send(send).status(200);
      } else {
        const send = {
          Nombre: result.Nombre,
          id: result.Id,
          imagen: result.Imagen,
        };
        res.send(send).status(200);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = Models;
