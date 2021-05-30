import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
import PurchasePC from './scenes/ClientView/PurchasePC/purchasePC'
import Product from './scenes/ProducerView/Producer/Products'
import LoginV2 from "./scenes/login/loginV2"
import RegisterV2 from "./scenes/register/registerV2"
import Logout from "./scenes/LogOut/logout"
import Scan from "./scenes/ClientView/ScanPage/scan"
import Fridge from "./scenes/ClientView/Fridge/Fridge"
import Profile from "./scenes/Profile/Profile"
import Spokes from "./scenes/MarketView/Departments/departments"
import DetailsSpokes from "./scenes/MarketView/Departments/detailsDepartment"
import ShoppingCart from './scenes/ClientView/ShoppingCard/shoppingCart';
import { Modal, Button } from 'react-bootstrap'
import "./App.css"
import { DataProvider } from './stores/Context'
import MyProductors from './scenes/MarketView/MyProductors/myProductors';
import Transition from './components/transition';
import Statistics from './scenes/MarketView/Statistiques/Stats';
import Forum from './scenes/Forum/Forum'
import Commentary from './scenes/Forum/commentary'

function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <DataProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginV2} />
            <Route path="/login" component={LoginV2} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterV2} />
            <Route path="/fridge" component={Fridge} />
            <Route path="/profile" component={Profile} />
            <Route path="/department" component={Spokes} />
            <Route path="/purchasePC" component={PurchasePC} />
            <Route path="/transition" component={Transition} />
            <Route path="/shoppingCart" component={ShoppingCart} />
            <Route path="/products" component={Product} />
            <Route path="/detailsSpokes" component={DetailsSpokes} />
            <Route path="/productors" component={MyProductors} />
            <Route path="/scan" component={Scan} />
            <Route path="/stats" component={Statistics} />
            <Route path="/forum" component={Forum} />
            <Route path="/commentary" component={Commentary} />
          </Switch>
        </Router>
        <div class="footer-dark">
          <footer id="FooterTestPython">
            <div class="container">
              <div class="row">
                <div class="col-sm-6 col-md-3 item">
                <a id="TestHtmlValue" style={{ cursor: "pointer" }} onClick={handleShow} href="#foo"> BlueMarket.com <u> Mention légales </u></a>
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Condition générales d'utilisation  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site bluemarket.shop les présentes mentions légales.
              La connexion et la navigation sur le site bluemarket.shop par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
              Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ».
</p> <br></br>
              <h2>ARTICLE 1 : L’éditeur</h2>
              <p> L’édition et la direction de la publication du site bluemarket.shop est assurée par L.BRAINE, J.MARCON et T.GARON domiciliées au 16 rue Jean Desparmet - 69008 LYON - FRANCE, dont le numéro de téléphone est 01-84-07-17-77, et l'adresse e-mail supinfo@supinfo.com.</p> <br></br>

              <h2> ARTICLE 2 : L’hébergeur </h2>
              <p> L'hébergeur du site bluemarket.shop est la Société OVHCloud, dont le siège social est situé au 2 rue Kellermann - 591000 ROUBAIX - FRANCE, avec le numéro de téléphone : 09-55-00-66-33. </p> <br></br>

              <h2> ARTICLE 3 : Accès au site </h2>
              <p>Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
              En cas de modification, interruption ou suspension des services le site bluemarket.shop ne saurait être tenu responsable.
</p> <br></br>

              <h2> ARTICLE 4 : Collecte des données </h2>
              <p> Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés. Le site est déclaré à la CNIL sous le numéro 015455453732222.
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
              <p>Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du site bluemarket.shop,  sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.

Pour plus d’informations, se reporter aux CGU du site bluemarket.shop accessible à la rubrique« Register » 
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
                <div class="col-md-6 item text">
                  <h3>BlueMarket</h3>
                  <p>Société spécialisé dans la digitalisation de supermarché et site e-commerce en ligne</p>
                </div>
              </div>
              <p class="copyright">BlueMarket © 2021</p>
            </div>
          </footer>
        </div>
      </DataProvider>
    </div >

  );
}

export default App;
