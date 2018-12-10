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
        message: 'Η κατηγορία έχει διαγραφεί.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedEl = (name='') => {
    $.notify({
        message: `'Εχει διαγραφεί η κατηγορία: ${name} απο την λίστα.`
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
export let notifyEditedStation = () => {
    $.notify({
        message: 'Τα στοιχεία του σταθμού έχουν ενημερωθεί'
    },{
        type: 'success'
    });
};