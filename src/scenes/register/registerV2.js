import React, { useState } from 'react';
import { Button, Grid, TextField } from "@material-ui/core"
import loginImg from "../../assets/img/th.jpg"
import BlueMarket from "../../assets/img/BlueMarket.png"
import { Redirect } from "react-router-dom"
import { Modal } from 'react-bootstrap'
import { post } from "../../services/Api/Register/post"
import CircularProgress from '@material-ui/core/CircularProgress';

function RegisterV2() {

    const [details, setDetails] = useState({ firstname: "", lastname: "", email: "", fridgesize: "", password: "", role: "1" });
    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null)
    const [errorsCheck, setErrorsCheck] = useState(null)
    const [loading, setLoading] = useState(null)
    const [check, setCheck] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitHandler = async e => {
        e.preventDefault();
        if (check === true) {
            setLoading(true)
            setErrors(null)
            const { success, errors, data } = await post(details)
            if (success === true) {
                setLoading(false)
            } else {
                setErrors(errors)
                setLoading(false)
            }
        } else {
            setErrorsCheck("You didn't accept generals conditions")
        }
    }

    return (
        <div>
            {(loading === false) ? (
                <div>
                    <Redirect to="/login" />
                </div>
            ) : (
                <form onSubmit={submitHandler}>
                    <Grid container style={{ minHeight: '100vh' }}>
                        <Grid item xs={12} sm={6}>
                            <img src={loginImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </Grid>
                        <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{ padding: 10 }}>
                            <div />
                            <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300 }}>
                                <Grid container justify="center">
                                    <img src={BlueMarket} width={200} alt="logo" />
                                </Grid> <br></br>
                                {errors !== null ? <p style={{ color: "red" }}>{errors}</p> : ""}
                                <TextField label="Email" type="email" margin="normal" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                                <TextField label="firstname" margin="normal" onChange={e => setDetails({ ...details, firstname: e.target.value })} value={details.firstname} />
                                <TextField label="lastname" margin="normal" onChange={e => setDetails({ ...details, lastname: e.target.value })} value={details.lastname} />
                                <TextField label="fridgesize" margin="normal" onChange={e => setDetails({ ...details, fridgesize: e.target.value })} value={details.fridgesize} />
                                <TextField label="Password" margin="normal" type="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                                <div>
                                    {errorsCheck !== null ? <p style={{ color: "red" }}>{errorsCheck}</p> : ""}
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => setCheck(!check)} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        J'accepte les <a onClick={handleShow} href="#foo"> <u> conditions générale d'utilisation </u>  </a>
                                    </label>
                                    <Modal size="lg" show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Condition générales d'utilisation  </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h2>ARTICLE 1 : Objet</h2>
                                            <p> Les présentes « conditions générales d'utilisation » ont pour objet l'encadrement juridique de l’utilisation du site https://bluemarket.shop et de ses services.

                                            Ce contrat est conclu entre :

                                            Les gérants du site internet, ci-après désigné Ludovic BRAINE, Jéremie MARCON et Thibaut GARON,

                                            Toute personne physique ou morale souhaitant accéder au site et à ses services, ci-après appelé « l’Utilisateur ».

                                            Les conditions générales d'utilisation doivent être acceptées par tout Utilisateur, et son accès au site vaut acceptation de ces conditions. </p> <br></br>

                                            <h2> ARTICLE 2 : Mentions légales </h2>
                                            <p> Pour les personnes morales :

                                            Le site https://bluemarket.shop est édité par la société BlueMarket, SAS au capital de 50 000 €, dont le siège social est situé au 15 rue du test 69100 Villeurbanne.

                                            La société est représentée par Ludovic BRAINE, Thibaut GARON et Jeremie MARCON.


                                            Pour les personnes physiques :

                                            Le site https://bluemarket.shop est édité par Ludovic BRAINE, Jéremie MARCON et Thibaut GARON, domiciliées au 95 rue de la prod 69001 Lyon. </p> <br></br>

                                            <h2> ARTICLE 3 : accès aux services </h2>
                                            <p>
                                                L’Utilisateur du site  https://bluemarket.shop a accès aux services suivants : <br></br>
                                                •	Achat de produit alimentaire <br></br>
                                                •	Scan de produit <br></br>
                                                •	Consommation du fridgesize <br></br>
                                                •	Page de d’enregistrement et de connexion <br></br>
                                                •	Page produit <br></br>
                                                •	Calcul empreinte carbonne <br></br>
                                                •	Promotion client <br></br>
                                                •	Machine learning <br></br> <br></br>

                                                Tout Utilisateur ayant accès a internet peut accéder gratuitement et depuis n’importe où au site. Les frais supportés par l’Utilisateur pour y accéder (connexion internet, matériel informatique, etc.) ne sont pas à la charge de l’Éditeur.

                                                Le site et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment à l’occasion d’une maintenance, sans obligation de préavis ou de justification.

                                            </p>

                                            <h2> ARTICLE 4 : Responsabilité de l’Utilisateur </h2>
                                            <p> L'Utilisateur est responsable des risques liés à l’utilisation de son identifiant de connexion et de son mot de passe.

                                            Le mot de passe de l’Utilisateur doit rester secret. En cas de divulgation de mot de passe, l’Éditeur décline toute responsabilité.

                                            L’Utilisateur assume l’entière responsabilité de l’utilisation qu’il fait des informations et contenus présents sur le site https://bluemarket.shop.

                                            Tout usage du service par l'Utilisateur ayant directement ou indirectement pour conséquence des dommages doit faire l'objet d'une indemnisation au profit du site.

                                            Le membre s’engage à tenir des propos respectueux des autres et de la loi et accepte que ces publications soient modérées ou refusées par l’Éditeur, sans obligation de justification.

                                            En publiant sur le site, l’Utilisateur cède à la société éditrice le droit non exclusif et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé.

                                            L’Éditeur s'engage toutefois à citer le membre en cas d’utilisation de sa publication
</p> <br></br>
                                            <h2> ARTICLE 5 : Responsabilité de l’Éditeur </h2>
                                            <p>Tout dysfonctionnement du serveur ou du réseau ne peut engager la responsabilité de l’Éditeur.

                                            De même, la responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.

                                            Le site https://bluemarket.shop s'engage à mettre en œuvre tous les moyens nécessaires pour garantir la sécurité et la confidentialité des données. Toutefois, il n’apporte pas une garantie de sécurité totale.

                                            L’Éditeur se réserve la faculté d’une non-garantie de la fiabilité des sources, bien que les informations diffusées su le site soient réputées fiables.
</p> <br></br>

                                            <h2> ARTICLE 6 : Propriété intellectuelle </h2>
                                            <p>Les contenus du site https://bluemarket.shop (logos, textes, éléments graphiques, vidéos, etc.) sont protégés par le droit d’auteur, en vertu du Code de la propriété intellectuelle.

                                            L’Utilisateur devra obtenir l’autorisation de l’éditeur du site avant toute reproduction, copie ou publication de ces différents contenus.

                                            Ces derniers peuvent être utilisés par les utilisateurs à des fins privées ; tout usage commercial est interdit.

                                            L’Utilisateur est entièrement responsable de tout contenu qu’il met en ligne et il s’engage à ne pas porter atteinte à un tiers.

                                            L’Éditeur du site se réserve le droit de modérer ou de supprimer librement et à tout moment les contenus mis en ligne par les utilisateurs, et ce sans justification.
</p> <br></br>

                                            <h2> ARTICLE 7 : Données personnelles </h2>
                                            <p>L’Utilisateur doit obligatoirement fournir des informations personnelles pour procéder à son inscription sur le site.

                                            L’adresse électronique (e-mail) de l’utilisateur pourra notamment être utilisée par le site https://bluemarket.shop pour la communication d’informations diverses et la gestion du compte.

                                            https://bluemarket.shop garantie le respect de la vie privée de l’utilisateur, conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.

                                            Le site est déclaré auprès de la CNIL sous le numéro suivant : 5962844846.

                                            En vertu des articles 39 et 40 de la loi en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit via :

                                            •	Son espace personnel sur le site ;
                                            •	Un formulaire de contact ;
                                            •	Par mail à bluemarket@support.com;
                                            •	Par voie postale au 25 rue du support 69001 Lyon.
</p> <br></br>

                                            <h2> ARTICLE 8 : Liens hypertextes </h2>
                                            <p>Les domaines vers lesquels mènent les liens hypertextes présents sur le site n’engagent pas la responsabilité de l’Éditeur de https://bluemarket.shop, qui n’a pas de contrôle sur ces liens.

                                            Il est possible pour un tiers de créer un lien vers une page du site https://bluemarket.shop sans autorisation expresse de l’éditeur.
</p> <br></br>

                                            <h2> ARTICLE 9 : Évolution des conditions générales d’utilisation </h2>
                                            <p> Le site https://bluemarket.shop se réserve le droit de modifier les clauses de ces conditions générales d’utilisation à tout moment et sans justification. </p> <br></br>

                                            <h2> ARTICLE 10 : Durée du contrat </h2>
                                            <p> La durée du présent contrat est indéterminée. Le contrat produit ses effets à l'égard de l'Utilisateur à compter du début de l’utilisation du service.</p> <br></br>

                                            <h2> ARTICLE 11 : Droit applicable et juridiction compétente </h2>
                                            <p>Le présent contrat dépend de la législation française.
                                            En cas de litige non résolu à l’amiable entre l’Utilisateur et l’Éditeur, les tribunaux de Lyon sont compétents pour régler le contentieux.
</p><br></br>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                    </Button>

                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div style={{ height: 20 }} />
                                {loading == true ? <CircularProgress />
                                    : null}
                                <Button color="primary" variant="contained" type="submit">
                                    Register
                                </Button>
                                <div style={{ height: 20 }} />
                            </div>
                            <div />
                        </Grid>
                    </Grid>
                </form>
            )}
        </div>
    )
}

export default RegisterV2
