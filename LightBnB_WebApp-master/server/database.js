const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

/// passing db credential to pool(db)
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const queryGetUserWithEmail = `SELECT * FROM users WHERE email = $1`;

const getUserWithEmail = function(email) {
  return pool
    .query(queryGetUserWithEmail, [email])
    .then((result) => {
      console.log('USER EMAIL', result.rows);
      if(result.rows.length === 0){
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const queryGetUserWithId = `SELECT * FROM users WHERE id = $1`;

const getUserWithId = function(id) {
  return pool
    .query(queryGetUserWithId, [id])
    .then((result) => {
      console.log('USER ID', result.rows);
      if(result.rows.length === 0){
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */



const addUser =  function(user) {
  const queryAddUser = `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *`;

  return pool
    .query(queryAddUser, [user.name, user.email, user.password])
    .then((result) => {
      //console.log('Reservations', result.rows);
        return result.rows[0];
      }
    )
    .catch((err) => {
      console.log(err.message);
    });

}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const queryGetAllReservations = `SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2`;

  return pool
  .query(queryGetAllReservations, [guest_id, limit])
  .then((result) => {
      return result.rows[0];
    }
  )
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  };
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `WHERE owner_id = $${queryParams.length} `;
  };
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night), Number(options.maximum_price_per_night));
    queryString += `AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}`;
  };
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `AND rating > $${queryParams.length} `;
  };
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  return pool.query(queryString, queryParams).then((res) => res.rows).catch((err) => console.log(err.message));
  /** old codes for fetching in json:
  return pool
  .query(
    'SELECT * FROM properties LIMIT $1', [ limit ])
  .then((result) => console.log(result.rows))
  .catch((err) => console.log(err.message));
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
*/
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }
const addProperty = function(property) {
  return pool
  .query(
    'INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id created',
    [ property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms ])
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));
  /** Old codes:
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
  */
}

exports.addProperty = addProperty;
