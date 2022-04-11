import { Grid } from '@material-ui/core';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import swal from 'sweetalert';


export default function ResetPassword(){
    const history = useHistory();
    const [newPassword, setNewPassword] = useState("");

    const update = async (e: SyntheticEvent) => {
        e.preventDefault();
        const user = auth.currentUser;

        if(!newPassword){
            setNewPassword("");
            swal("Unsuccessful","Invalid Password","error");
        }else{
            user&&updatePassword(user, newPassword).then(()=>{
                console.log("Reset password successful");
                swal("Successful", "Reset Password","success")
                history.push('/profile');
            }).catch((error)=>{
                setNewPassword("");
                swal("Unsuccessful", "Invalid Password","error")
                console.log(error);
            });
        }
    }

    const cancel = (e: SyntheticEvent) => {
        e.preventDefault();
        history.push('/profile');
    }

    return(
        <div style={{marginTop:"30%"}}>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card >
                    <Container  style={{backgroundColor:"gray"}}>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label style={{color:"black", marginRight:"5px"}}>New Password</label>

                                    <input className="form_input" type="password" required  value={newPassword}
                                        style={{paddingLeft:"15px"}}
                                        onChange={(e)=>{setNewPassword(e.target.value)}} />
                                </div>
                            </Col>
                        </Row>

                        <Row id="editButtonsRow">
                            <Col id="updateProfileBtnCol" style={{marginBottom:"15px"}}>
                                <button data-testid="updateButton" id="UpdateProfile" type="submit" onClick={(e) => update(e)} >Reset</button><br />
                            </Col>
                            <Col id="cancelProfileBtnCol" style={{marginBottom:"15px"}}>
                                <button data-testid="cancelButton" id="CancelEdits" type="submit" onClick={(e) => cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )
}