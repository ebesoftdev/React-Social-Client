import {Button, Form, Modal} from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteGroup } from "./Group.api";
import { clear } from "../post/postSlice"
import { SyntheticEvent } from "react";

interface Props {groupName: string, onHide: (e: SyntheticEvent) => void, show:boolean}

export default function DeleteGroup({groupName, onHide, show}: Props) {
    const dispatch = useDispatch();

    const history = useHistory();

    function removeGroup(groupName: string) {
        dispatch(clear())
        deleteGroup(groupName).then(() => {history.push('/feed')});
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="deleteGroupModal"
        >
            <Modal.Header closeButton >
                <Modal.Title>
                    Deleting Group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Click on confirm to delete the group {groupName}
            </Modal.Body>
            <Modal.Footer>
            <Form>
                    <Button variant="primary" id="confirmDelete" type="button" onClick={() => removeGroup(groupName)}>Confirm</Button>
                    <Button variant="secondary" id="cancelDelete" type="button" onClick={(e) => onHide(e)}>Cancel</Button>
                </Form>
            </Modal.Footer>
        </Modal>
    );
}