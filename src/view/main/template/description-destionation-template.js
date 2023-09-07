import { destinations } from '../../../moks/destination.js';

function createDescriptionDestinationTemplate(point) {
  const destinationId = destinations.find((itemDestinations) => point.destination === itemDestinations.id);
  const picture = destinationId.picture.map((itemPicture) => Object.values(itemPicture));
  function pictureTemplate() {
    if(picture.length > 0) {
      return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picture.map(([src, decriptionPicture]) => `
          <img class="event__photo" src="${src}" alt="${decriptionPicture}">
          `).join('')}
        </div>
      </div>`;
    }
    return '';
  }

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
      ${destinationId.description}
    </p>

    ${pictureTemplate()}
  </section>
  `;
}

export { createDescriptionDestinationTemplate };
