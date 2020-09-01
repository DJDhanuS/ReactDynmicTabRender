import React from 'react';
import {
    ControlLabel, DropdownButton, MenuItem,
    Modal,
    Panel,
} from 'react-bootstrap';
import {connect} from 'react-redux'

class ModalJsonEditor extends React.Component {
    state = {title:'', value:''};
    showModal = () => {this.props.showModal()};

    updateTitle = (value, title) => {
        this.setState({
            title : title,
            value:value
        })
    };

    render() {
        return (
            <div>
                <Modal
                    dialogClassName="modal-90w"
                    size="xl"
                    show={this.props.show}
                    onHide={this.showModal}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Partner Certificate Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {this.props.details !== undefined ?
                                <div>
                                    <Panel>
                                        <table className="show_table" >
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <b>ID: </b><span>{this.props.details.id}</span>
                                                </td>
                                                <td>
                                                    <b>Certificate Request ID: </b><span>{this.props.details.certificateRequestId}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Host: </b><span>{this.props.details.fiName}</span>
                                                </td>
                                                <td>
                                                    <b>Certificate ID: </b>
                                                    <span>{this.props.details.certificateId}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>CNAME: </b><span>{this.props.details.cname}</span>
                                                </td>
                                                <td>
                                                    <b>Created: </b><span>{this.props.details.created}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Status: </b><span>{this.props.details.status}</span>
                                                </td>
                                                <td>
                                                    <b>Expiry: </b><span>{this.props.details.expiry}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Cert Alias: </b><span>{this.props.details.certAlias}</span>
                                                </td>
                                                {/*<td>*/}
                                                {/*    <b> Created By: </b><span>{this.props.details.createdBy}</span>*/}
                                                {/*</td>*/}
                                            </tr>

                                            </tbody>
                                        </table>

                                        <ControlLabel className="inline-control-label" style={{marginTop:"20px"}}>Keystore Details</ControlLabel>
                                        <table className="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <b>Subject: </b>
                                                    <span>{this.props.details.keystoreDetails.subject}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Issuer: </b>
                                                    <span>{this.props.details.keystoreDetails.issuer}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>SerialNumberHex: </b>
                                                    <span>{this.props.details.keystoreDetails.serialNumberHex}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>NotBeforeDate: </b>
                                                    <span>{this.props.details.keystoreDetails.notBeforeDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>NotAfterDate: </b><span>{this.props.details.keystoreDetails.notAfterDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>FingerPrint: </b>
                                                    <DropdownButton bsStyle="primary" title={!this.state.title?"SHA1":this.state.title} id="certificateID">
                                                        <MenuItem onClick={() => this.updateTitle(this.props.details.keystoreDetails.fingerPrintSHA1, 'SHA1')}>SHA1</MenuItem>
                                                        <MenuItem onClick={() => this.updateTitle(this.props.details.keystoreDetails.fingerPrintMD5, 'MD5')}>MD5</MenuItem>
                                                        <MenuItem onClick={() => this.updateTitle(this.props.details.keystoreDetails.fingerPrintSHA256, 'SHA256')}>SHA256</MenuItem>
                                                    </DropdownButton>
                                                    <span style={{marginLeft: "10px"}}>
                                                        {!this.state.value?this.props.details.keystoreDetails.fingerPrintSHA1: this.state.value}
                                                    </span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>SignatureAlg: </b> <span>{this.props.details.keystoreDetails.signatureAlg}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <b>Version: </b>
                                                    <span>{this.props.details.keystoreDetails.version}</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </Panel>
                                </div>
                                : <span/>
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
const mapStateProps = (state) => {
    return{
        details: state.certificate.details
    }
};

export default connect(mapStateProps) (ModalJsonEditor);
