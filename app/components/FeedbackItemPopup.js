import Popup from "../shared-components/Popup";

export default function FeedbackItemPopup({ title, setShow }) {
  return (
    <Popup title={""} setShow={setShow}>
      {title}
    </Popup>
  );
}
