import { Button, Col, Form, Modal, Row} from "react-bootstrap";
import { Post } from '../post/post'
import swal from 'sweetalert';
import { formatYT } from "../../util/youtubeFunctions";
import profanityFilter from '../../util/profanityFilter';

// This function checks the embedURL and returns the appropriate contentType
function checkEmbed(embedURL: string) {
    // Check first that it's a URL by performing a split
    let urlMap = embedURL.split(".");
    
    // If it's a proper url, it should have at least 2 values here. 
    if (urlMap.length >= 2){
        // Checks if there's a valid file type extension at the end
        let end = urlMap[urlMap.length - 1] ;
        let expectedFileTypes = new Map([['jpg','img'], ['jpeg', 'jpeg'], [ 'fjif', 'fjif'] , ['pjp', 'pjp'], ['gifv','gifv'], ['gif','gif'],['png','png']]);

        // If it's a valid file type, we just return that it's an img
        if (expectedFileTypes.get(end) != undefined){
            return "IMG";
        }
        else {
            try {
                // Split with the slash makes sure that it's a youtube link by trying to save the fourth position which should always exist in a youtube link.
                let ytMap = embedURL.split("/");
                end = ytMap[3];
                
                // Use our function to get the video code from the entire URL
                let vCode = formatYT(embedURL);
                
                // If the videocode isn't null, then it's a valid
                if (vCode != null) return "VID";
                else return null;
            }
            catch {
                return null;
            }
        }
    }
    else {
        return null;
    }
    
}

interface Props {
  setPost: (post: Post) => void,
  post: Post,
  dispatchPost: (e?: boolean) => void,
  showModal: boolean
  onHide: () => void
}

function SubmitPost({setPost, post, dispatchPost, showModal, onHide}: Props) {
    const closeSubmit = () => {
        if (post.postText != "") {
            
            if (profanityFilter.filter(post.postText)) {
              let cType = checkEmbed(post.contentLink) as string;
              post.contentType = cType;

              onHide();
              dispatchPost();
            } 
            else
              swal("", "Inappropriate content", "error");

        } else {
            swal("", "Posts must have a body!", "error");
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="createPostModal"
        >
            <Modal.Header closeButton >
                <Modal.Title>
                    New Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Picture Input */}
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={11}>
                            {/* Next line sets the text that sits in the input. Line after sets the imageURL*/}
                            <Form.Control                                
                              placeholder="Image or Video Embed URL"
                              onChange={(event) => {
                                setPost({...post} as Post)
                                setPost({ ...post, contentLink: event.target.value })
                                } 
                              } 
                            />
                        </Col>
                    </Form.Group>

                    {/* Text Input */}
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={12}>
                            <Form.Control
                                as="textarea"
                                placeholder="Post"
                                style={{ height: "100px"}}
                                maxLength={1000}
                                onChange={(event) => {
                                    setPost({ ...post, postText: event.target.value })
                                }
                            }
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* Submit Button */}
                <Button data-testid="submitPostButton" id="submitPostBtn" type="button" onClick={() => closeSubmit()}>Post to Reverb</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubmitPost;