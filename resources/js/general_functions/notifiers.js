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
export let notifyGeneralCreatedEl = () => {
    $.notify({
        message: '\'Εχει δημιουργηθεί καινούργια κατηγορία.'
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
export let notifyGeneralEditedEl = () => {
    $.notify({
        message: '\'Εχει γίνει ενημέρωση κατηγορίας.'
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
export let notifyGeneralDeletedEl = () => {
    $.notify({
        message: '\'Εχει διαγραφεί μια κατηγορία απο την λίστα.'
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
export let notifyGeneralDeletedUser = () => {
    $.notify({
        message: '\'Εχει διαγραφεί ένας χρήστης απο την λίστα.'
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
export let notifyGeneralCreatedUser = () => {
    $.notify({
        message: '\'Εχει δημιουργηθεί νέος χρήστης.'
    },{
        type: 'info'
    });
};
export let notifyEditedUser = () => {
    $.notify({
        message: 'Ο χρήστης έχει ενημερωθεί.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedUser = () => {
    $.notify({
        message: '\'Εχει ενημερωθεί ένας χρήστης.'
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
        message: 'Συγχαρητήρια. Ο λογαριασμός σας έχει αναβαθμιστεί με δικαιώματα διαχειριστή.'
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
        message: 'Ο λογαριασμός σας έχει διαγραφεί επιτυχώς.'
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