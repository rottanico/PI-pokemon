const axios = require("axios");
const validator = require("validator");
const db = require("../../db");
const { Type } = require("../../db");


class Models {
  constructor(modelo) {
    this.model = modelo;
  }
 
  
  postPokemon = async (req, res, next) => {
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imagen } =req.body;
    const tipo = req.body.tipo;
    
    if(!await this.model.findOne({where:{ Nombre:nombre}})){
    const [result,status] = await this.model
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
        }
      }).catch((error) => next(error));
    tipo.forEach(async (tip) => {
      const valor = await Type.findOne({ where: { Nombre: tip } });
      !!valor && !!result && result.addType(valor);
    });

    const result2= await this.model.findByPk(result.Id,{include: { model: Type }})
    const send = {
      nombre: result2.Nombre,
      id: result2.Id,
      img: result2.Imagen,
      fuerza:result2.Fuerza,
      tipo: result2.types.map(tipo=>tipo.Nombre)
    };
    status?res.send(send).status(200):res.sendStatus(500);}else res.sendStatus(500)
      
    
  };
  
  getAll = async (req, res, next) => {
    const value= parseInt(req.query.paso,10)+1
    const inicio= parseInt(req.query.inicio,10)+1
       var array=[];
       
  if(inicio===1){
     var {count,rows} =  await this.model.findAndCountAll({ include: { model: Type } });
   var arrayDb = rows.map((dato) => {
      return { nombre: dato.Nombre, id: dato.Id, img: dato.Imagen ,tipo:dato.types.map(tipo=>tipo.Nombre),fuerza:dato.Fuerza};
    });
  }else{var arrayDb=[]}
   const fin= inicio===1?(value-count):value
      for(var i=inicio; i<fin;i++){
        array.push(  axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
       .then((res) =>  {
        return {nombre:res.data.name,id:res.data.id,fuerza:res.data.stats[1].base_stat,img:res.data.sprites.front_default,tipo:res.data.types.map((tipo) => {
          return tipo.type.name;
        })}} ) )
      }
      const resu = await Promise.all(array);
      res.send(arrayDb.concat(resu)); 
     

    
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
  
  getById = async (req, res, next) => {
    try {
      if (validator.isUUID(req.params.id)) {
        const result = await this.model.findByPk(req.params.id, {
          include: { model: Type },
        });
        const obj={
          nombre:result.Nombre, id:result.Id,imagen:result.Imagen,
          fuerza:result.Fuerza,defensa:result.Defensa,altura:result.Altura,
          peso:result.Peso,velocidad:result.Velocidad,tipo:result.types.map(tipo=>tipo.Nombre),
          vida:result.Vida
        }
        res.send(obj).status(200);
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
          tipo: result2.data.types.map((tipo) => tipo.type.name)
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
      .findOne({ where: { Nombre: name },include: { model: Type }})
      .catch((error) => next(error));

    try {
      if (!result) {
        const result2 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const send = {
          nombre: result2.data.name,
          id: result2.data.id,
          img: result2.data.sprites.front_default,
          tipo:result2.data.types.map((tipo) => {
            return tipo.type.name;
          })
        };
        res.send(send).status(200);
      } else {
        const send = {
          nombre: result.Nombre,
          id: result.Id,
          img: result.Imagen,
          tipo: result.types.map(tipo=>tipo.Nombre)
        };
        res.send(send).status(200);
      }
    } catch (error) {
      next(error);
      
    }
  };
}

module.exports = Models;
