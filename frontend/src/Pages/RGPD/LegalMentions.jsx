import React from 'react';
import './LegalMentions.css';

const LegalMentions = () => {
  return (
    <div className="legal-container">
      <h1>Mentions Légales</h1>

      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Nom de l'entreprise :SVL:Sound, Video, Light <br />
          Adresse : 123 Rue de l'Image, 75000 Paris, France<br />
          Téléphone : +33 1 23 45 67 89<br />
          Email : contact.svl@orange.fr<br />
          RCS : 123 456 789 RCS Paris<br />
          Numéro de TVA intracommunautaire : FR12345678901
        </p>
      </section>

      <section>
        <h2>2. Directeur de publication</h2>
        <p>
          Nom : Jean Dupont<br />
          Adresse : 123 Rue de l'Image, 75000 Paris, France<br />
          Téléphone : +33 1 23 45 67 89<br />
          Email : jean.dupont@svlvente.fr
        </p>
      </section>

      <section>
        <h2>3. Hébergement</h2>
        <p>
          Nom de l'hébergeur : Hébergeur Web SAS<br />
          Adresse : 456 Avenue du Serveur, 75002 Paris, France<br />
          Téléphone : +33 1 98 76 54 32<br />
          Email : support@hebergeurweb.fr
        </p>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          Le contenu du site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Audiovisuel Vente SARL, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
        </p>
      </section>

      <section>
        <h2>5. Données personnelles et RGPD</h2>
        <p>
          Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition aux données personnelles vous concernant. Vous pouvez exercer ces droits en nous contactant à l'adresse email suivante : dpo@audiovisuelvente.fr.
        </p>
        <p>
          Responsable de la protection des données : Marie Dubois<br />
          Email : dpo@audiovisuelvente.fr<br />
          Adresse : 123 Rue de l'Image, 75000 Paris, France
        </p>
      </section>

      {/* <section>
        <h2>6. Utilisation des cookies</h2>
        <p>
          Le site utilise des cookies pour améliorer l'expérience utilisateur et à des fins statistiques. Vous pouvez configurer votre navigateur pour refuser les cookies ou être informé lorsque des cookies sont envoyés. Si vous désactivez les cookies, certaines parties du site pourraient ne pas fonctionner correctement.
        </p>
      </section> */}

      <section>
        <h2>6. Limitation de responsabilité</h2>
        <p>
          SVL ne peut être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'accéder au site.
        </p>
      </section>

      <section>
        <h2>7. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>
    </div>
  );
};

export default LegalMentions;
