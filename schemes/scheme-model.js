const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findSteps
};

function find() {
  return db.select("*").from("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(schemeId) {
  return db("steps")
    .join("schemes", "schemes.id", "scheme_id")
    .select("steps.id", "scheme_name", "instructions")
    .where("scheme_id", schemeId);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("schemes")
    .where("id", id)
    .update(changes);
  // .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db("schemes")
    .where("id", id)
    .del();
}

function addById(id) {
  return db("steps").where({ id }).first;
}
