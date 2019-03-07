export let notifyEmptyEl = () => {
    $.notify({
        message: 'Fill in all fields in group creation.'
    },{
        type: 'warning'
    });
};
export let notifySameName = () => {
    $.notify({
        message: 'The category name already exists in the list.'
    },{
        type: 'warning'
    });
};
export let notifySameSymbol = () => {
    $.notify({
        message: 'The category symbol already exists in the list.'
    },{
        type: 'warning'
    });
};
export let notifyNumberError = () => {
    $.notify({
        message: 'There is an error in the limit of the numeric values.'
    },{
        type: 'warning'
    });
};
export let notifyCreatedEl = () => {
    $.notify({
        message: 'The new category was created.'
    },{
        type: 'success'
    });
};
export let notifyGeneralCreatedEl = (name='') => {
    $.notify({
        message: `'New category was created with name: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyEditedEl = () => {
    $.notify({
        message: 'The category has been updated.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedEl = (name='') => {
    $.notify({
        message: `A category was updated with name: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyDeletedEl = () => {
    $.notify({
        message: 'The category has been deleted. The page will be redirected to make the changes.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedEl = (name='') => {
    $.notify({
        message: `The category with name: ${name} has been deleted. The page will be redirected to make the changes.`
    },{
        type: 'danger'
    });
};
export let notifyGeneralUpdatedList = () => {
    $.notify({
        message: `List was updated.`
    },{
        type: 'info'
    });
};
export let notifyUnauthorizedAction = () => {
    $.notify({
        message: 'Action not allowed!'
    },{
        type: 'danger'
    });
};
export let notifyDeletedUser = () => {
    $.notify({
        message: 'The user has been deleted.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedUserStations = () => {
    $.notify({
        message: `The user's stations have been deleted.`
    },{
        type: 'danger'
    });
};
export let notifyDeletedUserStationsCollections = () => {
    $.notify({
        message: `The stations collections from user have been deleted.`
    },{
        type: 'danger'
    });
};
export let notifyTheDeletedUser = () => {
    $.notify({
        message: 'You have been deleted from the system.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedUser = (email='') => {
    $.notify({
        message: `The user with email: ${email} was deleted from system.`
    },{
        type: 'info'
    });
};
export let notifyGeneralDeletedUserStations = (email='', arr=[]) => {
    $.notify({
        message: `'Stations with id's: ${arr.join(', ')} have been deleted (total: ${arr.length}) from user with email: ${email}.`
    },{
        type: 'info'
    });
};
export let notifyGeneralDeletedUserCollections = (arr=[]) => {
    $.notify({
        message: `The stations collections have been deleted. (Total: ${arr.length})`
    },{
        type: 'info'
    });
};
export let notifyGeneralDeletedStationCollections = (arr=[]) => {
    $.notify({
        message: `The stations collections have been deleted. (Total: ${arr.length})`
    },{
        type: 'info'
    });
};
export let notifyFormEmptyUserFields = () => {
    $.notify({
        message: 'Fill in all fields in user creation.'
    },{
        type: 'warning'
    });
};
export let notifyDiffPasswordsInUserFields = () => {
    $.notify({
        message: 'The passwords you have filled in the fields do not match.'
    },{
        type: 'warning'
    });
};
export let notifyBiggerPasswordsInUserFields = () => {
    $.notify({
        message: 'The password should be at least 6 characters long.'
    },{
        type: 'warning'
    });
};
export let notifyInvalidEmailOnInput = () => {
    $.notify({
        message: 'The email you filled in is not a valid Email address.'
    },{
        type: 'warning'
    });
};
export let notifyUserEmailExists = () => {
    $.notify({
        message: 'The email you filled in is already in the list.'
    },{
        type: 'warning'
    });
};
export let notifyCreatedUser = () => {
    $.notify({
        message: 'New user has been created.'
    },{
        type: 'success'
    });
};
export let notifyGeneralCreatedUser = (email='') => {
    $.notify({
        message: `'A new user has been created with email: ${email}.`
    },{
        type: 'info'
    });
};
export let notifyEditedUser = () => {
    $.notify({
        message: 'User details have been updated.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedUser = (name='') => {
    $.notify({
        message: `Details from user with email: ${name} have been updated.`
    },{
        type: 'info'
    });
};
export let notifyTheInactiveUser = () => {
    $.notify({
        message: 'Your account has been deactivated.'
    },{
        type: 'danger'
    });
};
export let notifyTheUpgradedUser = () => {
    $.notify({
        message: 'Your account has been upgraded with administrator rights.'
    },{
        type: 'success'
    });
};
export let notifyTheDowngradedUser = () => {
    $.notify({
        message: 'Your account has been updated. You no longer have administrator rights.'
    },{
        type: 'warning'
    });
};
export let notifyDeleteProfile = () => {
    $.notify({
        message: 'Your account has been deleted.'
    },{
        type: 'danger'
    });
};
export let notifyAdminsDeletedUserEmailNotSent = (name='') => {
    $.notify({
        message: `There was an error sending the deletion email to the user: ${name}`
    },{
        type: 'danger'
    });
};
export let notifyAdminsSuspendedUserEmailNotSent = (name='') => {
    $.notify({
        message: `An error occurred while sending the disabling email to the user: ${name}`
    },{
        type: 'danger'
    });
};
export let notifyEditedUserEmptyFields = () => {
    $.notify({
        message: `Fill in all the fields in the User's information edit form.`
    },{
        type: 'warning'
    });
};
export let notifyUpdatedProfile = () => {
    $.notify({
        message: 'You have successfully updated your account information.'
    },{
        type: 'success'
    });
};
export let notifyEditedUserPasswordEmptyFields = () => {
    $.notify({
        message: 'Fill in all the fields in the password change form.'
    },{
        type: 'warning'
    });
};
export let notifyEditedUserCurrentPasswordDontMatch = () => {
    $.notify({
        message: 'The password you filled in does not match your current password.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedStation = () => {
    $.notify({
        message: 'Your station has been deleted.'
    },{
        type: 'danger'
    });
};
export let notifyDeletedStationCollections = () => {
    $.notify({
        message: `The station's measurements collections have been deleted.`
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedStation = (name='') => {
    $.notify({
        message: `The station with name: ${name} has been deleted.`
    },{
        type: 'info'
    });
};
export let notifyCreatedStationEmptyFields = () => {
    $.notify({
        message: 'Fill in all the fields in the station creation form.'
    },{
        type: 'warning'
    });
};
export let notifyStationNameExists = () => {
    $.notify({
        message: 'The name you selected for the station is already in the list.'
    },{
        type: 'warning'
    });
};
export let notifyStationUniqueExists = () => {
    $.notify({
        message: 'The unique code you selected is already in the list.'
    },{
        type: 'warning'
    });
};
export let notifyCreatedStation = () => {
    $.notify({
        message: 'The station has been created.'
    },{
        type: 'success'
    });
};
export let notifyGeneralCreatedStation = (name='') => {
    $.notify({
        message: `The station with name: ${name} has been created.`
    },{
        type: 'info'
    });
};
export let notifyGeneralCreatedStationWithOwnership = (name='') => {
    $.notify({
        message: `The station with name: ${name} has been created and you were chosen as it's owner.`
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedStationWithOwnership = (name='') => {
    $.notify({
        message: `You were chosen as the owner of station with name: ${name}.`
    },{
        type: 'success'
    });
};
export let notifyEditedStation = () => {
    $.notify({
        message: 'Station details have been updated.'
    },{
        type: 'success'
    });
};
export let notifyGeneralEditedStation = (name='') => {
    $.notify({
        message: `Details of station with name: ${name} have been updated.`
    },{
        type: 'info'
    });
};
export let notifyGeneralError = () => {
    $.notify({
        message: 'An error occurred.'
    },{
        type: 'error'
    });
};
export let notifyNoChangesMade = () => {
    $.notify({
        message: 'No changes made.'
    },{
        type: 'info'
    });
};
export let notifyGeneralCreatedCollection = (name='') => {
    $.notify({
        message: `A new measurements collection has been created from station with name: ${name}.`
    },{
        type: 'info'
    });
};
export let notifyGeneralCategories = () => {
    $.notify({
        message: 'This page lists all available categories that you can select for your stations.'
    },{
        type: 'info'
    });
};
export let notifyGeneralStationCreateInfo = () => {
    $.notify({
        message: `Please fill in all the details so that you can see instructions for connecting your station to the system.`
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
        message: 'A link has been copied to clipboard.'
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
export let notifyDeletedCollection = () => {
    $.notify({
        message: 'The collection has been deleted.'
    },{
        type: 'danger'
    });
};
export let notifyGeneralDeletedCollection = (collection, station) => {
    $.notify({
        message: `The collection with code: ${collection.series_hash} from station with name: ${station.name}, has been deleted.`
    },{
        type: 'info'
    });
};
