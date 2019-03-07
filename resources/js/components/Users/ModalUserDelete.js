import React from 'react';

let ModalCategoryDelete = ({deleteUser, emailOfUser, clearDelete}) => (
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Warning</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="modal-body" className="modal-body"><h5 className='test-center'>Do you want to delete user: {emailOfUser};</h5><br/><p>Caution! The user, all his stations and their measurements will be deleted.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={clearDelete} data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={deleteUser}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

export default ModalCategoryDelete