export let notifyEmptyEl = () => {
    $.notify({
        message: 'Συμπληρώστε όλα τα πεδία στην δημιουργία ομάδας.'
    },{
        type: 'warning'
    });
};
export let notifySameName = () => {
    $.notify({
        message: 'Το όνομα κατηγορίας υπάρχει ήδη στην λίστα.'
    },{
        type: 'warning'
    });
};
export let notifySameSymbol = () => {
    $.notify({
        message: 'Το σύμβολο υπάρχει ήδη στην λίστα.'
    },{
        type: 'warning'
    });
};
export let notifyCreatedEl = () => {
    $.notify({
        message: 'Η καινούργια κατηγορία δημιουργήθηκε.'
    },{
        type: 'success'
    });
};
export let notifyGeneralCreatedEl = (name='') => {
    $.notify({
        message: `'Εχει δημιουργηθεί η κατηγορία: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyEditedEl = () => {
    $.notify({
        message: 'Η κατηγορία έχει ενημερωθεί.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedEl = (name='') => {
    $.notify({
        message: `'Εχει γίνει ενημέρωση της κατηγορίας: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyDeletedEl = () => {
    $.notify({
        message: 'Η κατηγορία έχει διαγραφεί. Θα γίνει ανανέωση της σελίδας για να πραγματοποιηθούν οι αλλαγές.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedEl = (name='') => {
    $.notify({
        message: `'Εχει διαγραφεί η κατηγορία: ${name} απο την λίστα. Θα γίνει ανανέωση της σελίδας για να πραγματοποιηθούν οι αλλαγές.`
    },{
        type: 'danger'
    });
};
export let notifyGeneralUpdatedList = () => {
    $.notify({
        message: `'Εχει ανανεωθεί η λίστα.`
    },{
        type: 'info'
    });
};
export let notifyUnauthorizedAction = () => {
    $.notify({
        message: 'Μη επιτρεπτή ενέργεια!'
    },{
        type: 'danger'
    });
};
export let notifyDeletedUser = () => {
    $.notify({
        message: 'Ο χρήστης έχει διαγραφεί.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedUserStations = () => {
    $.notify({
        message: 'Έχουν διαγραφεί οι σταθμοί του χρήστη.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedUserStationsCollections = () => {
    $.notify({
        message: 'Έχουν διαγραφεί οι συλλογές μετρήσεων των σταθμών του χρήστη.'
    },{
        type: 'danger'
    });
};
export let notifyTheDeletedUser = () => {
    $.notify({
        message: 'Έχετε διαγραφεί απο το σύστημα.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedUser = (name='') => {
    $.notify({
        message: `'Εχει διαγραφεί απο το σύστημα ο χρήστης με email: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyGeneralDeletedUserStations = (name='', arr=[]) => {
    $.notify({
        message: `'Εχουν διαγραφεί οι σταθμοί με id: ${arr.join(', ')} του χρήστη: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyGeneralDeletedUserCollections = (arr=[]) => {
    $.notify({
        message: `'Εχουν διαγραφεί οι συλλογές μετρήσεων των σταθμών του. (Σύνολο: ${arr.length})`
    },{
        type: 'info'
    });
};
export let notifyGeneralDeletedStationCollections = (arr=[]) => {
    $.notify({
        message: `'Εχουν διαγραφεί οι συλλογές μετρήσεων του σταθμού. (Σύνολο: ${arr.length})`
    },{
        type: 'info'
    });
};
export let notifyFormEmptyUserFields = () => {
    $.notify({
        message: 'Συμπληρώστε όλα τα πεδία στην δημιουργία χρήστη.'
    },{
        type: 'warning'
    });
};
export let notifyDiffPasswordsInUserFields = () => {
    $.notify({
        message: 'Οι κωδικοί πρόσβασης που συμπληρώσατε στα πεδία δεν ταιριάζουν.'
    },{
        type: 'warning'
    });
};
export let notifyBiggerPasswordsInUserFields = () => {
    $.notify({
        message: 'Ο κωδικός πρόσβασης θα πρέπει να αποτελείται απο τουλάχιστον 6 χαρακτήρες.'
    },{
        type: 'warning'
    });
};
export let notifyInvalidEmailOnInput = () => {
    $.notify({
        message: 'To Email που συμπληρώσατε δεν αποτελεί εγκυρο Email.'
    },{
        type: 'warning'
    });
};
export let notifyUserEmailExists = () => {
    $.notify({
        message: 'To Email που συμπληρώσατε υπάρχει ήδη στην λίστα.'
    },{
        type: 'warning'
    });
};
export let notifyCreatedUser = () => {
    $.notify({
        message: 'Ο νέος χρήστης έχει δημιουργηθεί.'
    },{
        type: 'success'
    });
};
export let notifyGeneralCreatedUser = (email='') => {
    $.notify({
        message: `'Εχει δημιουργηθεί νέος χρήστης με email: ${email}.`
    },{
        type: 'info'
    });
};
export let notifyEditedUser = () => {
    $.notify({
        message: 'Τα στοιχεία του χρήστη έχουν ενημερωθεί.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedUser = (name='') => {
    $.notify({
        message: `'Εχουν ενημερωθεί τα στοιχεία του χρήστη με email: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyTheInactiveUser = () => {
    $.notify({
        message: 'Ο λογαριασμός σας έχει απενεργοποιηθεί.'
    },{
        type: 'danger'
    });
};
export let notifyTheUpgradedUser = () => {
    $.notify({
        message: 'Ο λογαριασμός σας έχει αναβαθμιστεί με δικαιώματα διαχειριστή.'
    },{
        type: 'success'
    });
};
export let notifyTheDowngradedUser = () => {
    $.notify({
        message: 'Ο λογαριασμός σας έχει ενηνερωθεί. Δεν έχετε πλέον δικαιώματα διαχειριστή.'
    },{
        type: 'warning'
    });
};
export let notifyDeleteProfile = () => {
    $.notify({
        message: 'Ο λογαριασμός σας έχει διαγραφεί.'
    },{
        type: 'danger'
    });
};
export let notifyEditedUserEmptyFields = () => {
    $.notify({
        message: 'Συμπληρώστε όλα τα πεδία στην φόρμα αλλαγής στοιχείων χρήστη.'
    },{
        type: 'warning'
    });
};
export let notifyUpdatedProfile = () => {
    $.notify({
        message: 'Έχετε ενημερώσει επιτυχώς τα στοιχεία του λογαριασμού σας.'
    },{
        type: 'success'
    });
};
export let notifyEditedUserPasswordEmptyFields = () => {
    $.notify({
        message: 'Συμπληρώστε όλα τα πεδία στην φόρμα αλλαγής κωδικού πρόσβασης.'
    },{
        type: 'warning'
    });
};
export let notifyEditedUserCurrentPasswordDontMatch = () => {
    $.notify({
        message: 'Ο κωδικός πρόσβασης που συμπληρώσατε δεν ταιριάζει με τον πραγματικό σας κωδικό.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedStation = () => {
    $.notify({
        message: 'Ο σταθμός σας έχει διαγραφεί.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedStationCollections = () => {
    $.notify({
        message: '΄Εχουν διαγραφεί οι συλλογές μετρήσεων του σταθμού.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedStation = (name='') => {
    $.notify({
        message: `'Εχει διαγραφεί ο σταθμός: ${name} απο την λίστα.`
    },{
        type: 'info'
    });
};
export let notifyCreatedStationEmptyFields = () => {
    $.notify({
        message: 'Συμπληρώστε όλα τα πεδία στην φόρμα δημιουργίας σταθμού.'
    },{
        type: 'warning'
    });
};
export let notifyStationNameExists = () => {
    $.notify({
        message: 'Το όνομα που επιλέξατε για τον σταθμό υπάρχει υπάρχει ήδη στην λίστα.'
    },{
        type: 'warning'
    });
};
export let notifyStationUniqueExists = () => {
    $.notify({
        message: 'Ο μοναδικός κωδικός που επιλέξατε υπάρχει υπάρχει ήδη στην λίστα.'
    },{
        type: 'warning'
    });
};
export let notifyCreatedStation = () => {
    $.notify({
        message: 'Ο σταθμός έχει δημιουργηθεί.'
    },{
        type: 'success'
    });
};
export let notifyGeneralCreatedStation = (name='') => {
    $.notify({
        message: `'Εχει δημιουργηθεί ο σταθμός με όνομα: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyGeneralCreatedStationWithOwnership = (name='') => {
    $.notify({
        message: `'Εχει δημιουργηθεί ο σταθμός με όνομα: ${name} και έχετε επιλεγεί ως ιδιοκτήτης του.`
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedStationWithOwnership = (name='') => {
    $.notify({
        message: `'Εχετε επιλεγεί ως ιδιοκτήτης του σταθμού με όνομα: ${name}.`
    },{
        type: 'success'
    });
};
export let notifyEditedStation = () => {
    $.notify({
        message: 'Τα στοιχεία του σταθμού έχουν ενημερωθεί.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedStation = (name='') => {
    $.notify({
        message: `Τα στοιχεία του σταθμού: ${name} έχουν ενημερωθεί.`
    },{
        type: 'info'
    });
};
export let notifyGeneralError = () => {
    $.notify({
        message: 'Παρουσιάστηκε κάποιο σφάλμα.'
    },{
        type: 'error'
    });
};
export let notifyNoChangesMade = () => {
    $.notify({
        message: 'Δεν έγινε καμία αλλαγή.'
    },{
        type: 'info'
    });
};
export let notifyGeneralCreatedCollection = (name='') => {
    $.notify({
        message: `Έχει δημιουργηθεί καινούργια συλλογή μετρήσεων απο τον σταθμό: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyGeneralCategories = () => {
    $.notify({
        message: 'Στην σελίδα αυτή βρίσκονται όλες οι διαθέσιμες κατηγορίες, τις οποίες μπορείτε να επιλέξετε για τους σταθμούς σας.'
    },{
        type: 'info'
    });
};
export let notifyGeneralStationCreateInfo = () => {
    $.notify({
        message: `Παρακαλώ συμπληρώστε όλα τα στοιχεία, ώστε να σας εμφανιστούν οδηγίες για την σύνδεση του σταθμού σας με το σύστημα.`
    },{
        type: "info",
        delay: 6000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-5 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"/>' +
        '<span data-notify="message">{2}</span>' + '</div>'
    });
};
export let notifyTextCopiedToClipboard = () => {
    $.notify({
        message: 'Ο σύνδεσμος έχει αντιγραφεί στο clipboard.'
    },{
        type: 'success',
        delay: 1000,
        placement: {
            from: "bottom",
            align: "right"
        },
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        }
    });
};
