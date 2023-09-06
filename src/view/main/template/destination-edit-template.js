import { destinations } from '../../../moks/destination.js';

function createDistinationEditTemplate () {
  return destinations.map((item) => `
  <option value="${item.city}"></option>
  `).join(' ');
}

export {createDistinationEditTemplate};
