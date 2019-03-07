import React from 'react';

let ModalCollectionDelete = ({collectionHash, onTriggerCloseModal, onClickDeleteCollection}) => (
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Warning</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onTriggerCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="modal-body" className="modal-body"><h5 className='test-center'>Do you want to delete the collection: {collectionHash};</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onTriggerCloseModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onClickDeleteCollection}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

export default ModalCollectionDelete