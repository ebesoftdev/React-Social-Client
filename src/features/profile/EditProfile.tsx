import { Grid } from '@material-ui/core';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Profile } from "./profile";
import { selectProfile, setProfile } from './profileSlice';
import { getProfile, updateProfile } from "./profile.api";
import Upload_Picture from './UploadPicture';

export let util = { update: (e: SyntheticEvent) => { }, cancel: (e: SyntheticEvent) => { } };

export default function EditProfile() {
    const profile = useSelector(selectProfile);
    const [input, setInput] = useState(profile);
  
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      getProfile()
        .then((profile: Profile) => dispatch(setProfile(profile)))
        .catch(err => console.log(err));
    }, []);

    const handleChange = (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      setInput({
          ...input,
          [target.name]: target.value
      });
    };

    util.update = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
          const updatedProfile = await updateProfile(input);
        //   const updatedProfile = input;
          dispatch(setProfile(updatedProfile));
          history.push('/profile');
        } catch (err) {
          console.log(err);
        }
    }

    util.cancel = (e: SyntheticEvent) => {
        e.preventDefault();
        history.push('/profile');
    }

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card id="EditProfile">
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label htmlFor="first_name">First Name</label>

                                    <input className="form_input" type="text" name="first_name" placeholder="First name" value={input.first_name}

                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="last_name">Last Name</label>

                                    <input className="form_input" type="textbox" name="last_name" placeholder="Last name" value={input.last_name}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="about_me">About Me</label>
                                    <textarea className="form_input" rows={9} name="about_me" placeholder="Your about me" value={input.about_me}
                                        onChange={handleChange}  > </textarea>
                                </div>
                            </Col>
                            <Col id="editCol2">
                                <div className="form_input-group">
                                    <label htmlFor="last_name">Birthday</label>
                                    <input className="form_input" type="textbox" name="birthday" placeholder="Birthday" value={input.birthday}

                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="last_name">Hobbies</label>
                                    <input className="form_input" type="textbox" name="hobby" placeholder="Hobby" value={input.hobby}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="last_name">Location</label>
                                    <input className="form_input" type="textbox" name="location" placeholder="Location" value={input.location}
                                        onChange={handleChange} required />
                                </div>
                                
                                <br /> <br />
                                <div className="form_input-group">
                                <label htmlFor="profile_img">Select Profile Image</label>
                                    <div className='form_input'>
                                        <Upload_Picture targetPicture="profile"/>
                                    </div>
                                </div>
                                <div className="form_input-group">
                                <label htmlFor="header_img">Select Header Image</label>
                                    <div className='form_input'>
                                        <Upload_Picture targetPicture="header"/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row id="editButtonsRow">
                            <Col id="updateProfileBtnCol">
                                <button data-testid="updateButton" id="UpdateProfile" type="submit" onClick={(e) => util.update(e)} >Update</button><br />
                            </Col>
                            <Col id="cancelProfileBtnCol">
                                <button data-testid="cancelButton" id="CancelEdits" type="submit" onClick={(e) => util.cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )
}


