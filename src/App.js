import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
import HomePage from './scenes/HomePage/homePage'
import Product from './scenes/Producteur/Products'
import DetailsProducts from './scenes/Producteur/Details'
import LoginV2 from "./scenes/login/loginV2"
import RegisterV2 from "./scenes/register/registerV2"
import Logout from "./scenes/LogOut/logout"
import Scan from "./scenes/ScanPage/scan"
import Fridge from "./scenes/Fridge/Fridge"
import Profile from "./scenes/Profile/Profile"
import Spokes from "./scenes/Spokes/spokes"
import DetailsSpokes from "./scenes/Spokes/detailsSpokes"
import DetailsProduct from './components/detailsProduct';
import { Modal, Button } from 'react-bootstrap'

function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginV2} />
          <Route path="/login" component={LoginV2} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterV2} />
          <Route path="/fridge" component={Fridge} />
          <Route path="/profile" component={Profile} />
          <Route path="/spokes" component={Spokes} />
          <Route path="/homePage" component={HomePage} />
          <Route path="/products" component={Product} />
          <Route path="/detailsSpokes" component={DetailsSpokes} />
          <Route path="/detailsProduct" component={DetailsProduct} />
          <Route path="/scan" component={Scan} />
          <Route path="/detailsProduct" component={DetailsProducts} />
        </Switch>
      </Router>
      <footer className="bg-light text-center text-lg-start">
        <div class="text-center p-3" style={{ backgroundColor: "grey" }}>
          © 2021 Copyright:
          <a class="text-dark">BlueMarket.com  <a style={{ cursor: "pointer" }} onClick={handleShow}> <u> Mention légales </u> </a></a>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Condition générales d'utilisation  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site _______________ les présentes mentions légales.
              La connexion et la navigation sur le site (indiquer le nom du site) par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
              Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ».
</p> <br></br>
              <h2>ARTICLE 1 : L’éditeur</h2>
              <p> L’édition et la direction de la publication du site _______________ est assurée par Ludovic Braine, domiciliée adresseDeTest, dont le numéro de téléphone est 00000000, et l'adresse e-mail admin@admin.com.</p> <br></br>

              <h2> ARTICLE 2 : L’hébergeur </h2>
              <p> L'hébergeur du site _______________ est la Société _______________, dont le siège social est situé au _______________ , avec le numéro de téléphone : _______________. </p> <br></br>

              <h2> ARTICLE 3 : Accès au site </h2>
              <p>Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
              En cas de modification, interruption ou suspension des services le site _______________ ne saurait être tenu responsable.
</p> <br></br>

              <h2> ARTICLE 4 : Collecte des données </h2>
              <p> Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés. Le site est déclaré à la CNIL sous le numéro _______________.
              En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :
              ·         via un formulaire de contact ;
              
              ·         via son espace personnel ;

</p> <br></br>
              <h2> ARTICLE 5 : Cookies </h2>
              <p>
L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.
En naviguant sur le site, il les accepte.
Un cookie est un élément qui ne permet pas d’identifier l’Utilisateur mais sert à enregistrer des informations relatives à la navigation de celui-ci sur le site Internet. L’Utilisateur pourra désactiver ce cookie par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.

</p> <br></br>

              <h2> ARTICLE 6 : Propriété intellectuelle </h2>
              <p>Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du site _______________,  sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.

Pour plus d’informations, se reporter aux CGU du site _______________ accessible à la rubrique« CGU » 
.
</p> <br></br>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
                                    </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </footer>
    </div >

  );
}

export default App;
