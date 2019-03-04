import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";
import {notifyTextCopiedToClipboard} from "../../general_functions/notifiers";
import {
    convertCategoryNamesToStr, findCategoryNameFromId,
    measuresInputUrl
} from "../../general_functions/generalFunctions";

let StationGenerateUrl = ({lastName, unique, is_active, checkedCategories, allCategories}) => {

    //***** FADE_IN CLASS
    let fadeInClass = `card animated fadeInRight ${!lastName ? 'delay-4s': 'delay-0.5s'}`;

    //***** FONTAWESOME LAMP
    let fontAwesomeLamp = <i className="text-warning fas fa-lightbulb"/>;

    let url = !!unique && !!checkedCategories.length && !!parseInt(is_active) &&
        measuresInputUrl(unique, convertCategoryNamesToStr(findCategoryNameFromId(checkedCategories, allCategories)));

    return (
        <div className={fadeInClass}>
            <CardBelowHeaderTitle font={fontAwesomeLamp} name='Πληροφοριες για Url αποστολής'/><hr/>
            {!!unique && !!checkedCategories.length ?
                !!parseInt(is_active) ?
                    <div className="card-body pt-0">
                        <p className='styled-text'>Παρακάτω εμφανίζεται το url αποστολής, σύμφωνα με τις
                            πληροφορίες που επιλέγετε για τον σταθμό σας.
                            Με αυτό το url θα μπορεί ο σταθμός σας να επικοινωνεί με το σύστημα, να στέλνει τις
                            μετρήσεις που λαμβάνει καθώς και να εμφανίζονται εδώ.
                        </p>
                        <h5 className='text-center'>Οδηγίες</h5>
                        <p className='styled-text'>Πατήστε στο παρακάτω url για αντιγραφή, μεταφέρετέ το στον σταθμό σας και ρυθμίστε τον ώστε
                            να στέλνει σε αυτό το url, με <strong>Post Request</strong>, τις επιλεγμένες κατηγορίες ως εξής:</p>
                        <CopyToClipboard
                            title='Αντιγραφή συνδέσμου'
                            className='point url-generator'
                            text={url}
                            onCopy={() => notifyTextCopiedToClipboard()}>
                            <h6><i className="fas fa-arrow-right"/>&nbsp;{url}</h6>
                        </CopyToClipboard>
                        <p><label>*Υποσημείωση: Στον σταθμό σας, αντικαταστήστε στο πεδίο "τιμή", την αντίστοιχη μετρήση.</label></p>
                        <p><i className=" text-danger fas fa-exclamation-circle"/>&nbsp;Προσοχή! Ο Μοναδικός κωδικός πρέπει να είναι προσωπικός. Μην τον αφήσετε εκτεθειμένο ή τον μεταβιβάσετε σε τρίτους.</p>
                    </div>
                :
                    <div>
                        <div className="card-body pt-0">
                            <p className='styled-text'><i className="fas fa-exclamation-triangle  text-danger"/>&nbsp;Επιλέξτε τον σταθμό σας ως ενεργό.
                                Με την επιλογή του σταθμού ως ανενεργού, καμία μέτρηση που θα λαμβάνεται απο το σύστημα δεν θα αποθηκεύεται.
                            </p>
                        </div>
                    </div>
            :
                <div className="card-body pt-0">
                    <p className='styled-text'>Καθώς συμπληρώνετε τα στοιχεία και επιλέξετε κάποια κατηγορία, θα δημιουργείται το url αποστολής.</p>
                    <label className='text-left'>*Υποσημείωση: Στο πεδίο Μοναδικός κωδικός δεν είναι αποδεκτοί οι ελληνικοί χαρακτήρες.</label>
                </div>
            }
        </div>
    );
};

export default StationGenerateUrl