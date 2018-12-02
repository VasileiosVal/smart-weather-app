import React from 'react';

let ModalProfileDelete = ({deleteProfile}) => {
    return (
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Ειδοποίηση</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="modal-body" className="modal-body"><h5 className='test-center'>Θέλετε να διαγράψετε τον λογαριασμό σας;</h5><br/><p>Προσοχή! Η ενέργεια αυτή δεν μπορεί να αναιρεθεί.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Ακύρωση</button>
                        <button type="button" className="btn btn-danger" onClick={deleteProfile}>Διαγραφή</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProfileDelete
