import { useEffect, useState } from "react";
import GifyModel from "./GifyModel";
import "./style.css";

const PostPage = () => {
  let [data, setData] = useState();
  let [isClicked, setClicked] = useState(false);
  let [source, setSource] = useState("");
  useEffect(() => {
    async function fn() {
      let one = await fetch(
        "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"
      );
      let data = await one.json();
      console.log(data.data);
      let arr = [];
      data.data.map((el)=>{
        arr.push(el.images.original.url);
      })
      setData(arr);

      console.log("22", arr);
    }
    fn();
  }, []);

  function getGIF(source) {
    if (source) setSource(source);
  }
  async function getDta(data) {
    console.log(data);
    let searchTerm = data;
    searchTerm = searchTerm.trim().replace(/ /g, "+"); // adds a + wherever a space is
    console.log("data 23 ", searchTerm);
    let one = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`
    );
    let data_ = await one.json();
    console.log("37",data_)
    if (data_) {
      let arr = [];
      data_.data.map((el)=>{
        arr.push(el.images.original.url);
      })
      setData(arr);
    }
  }

  return (
    <div className="container">
      <div className="top_head">
        <div className="CP">
          <p>Compose Post</p>
        </div>
        <div className="PV">
          <p>photo/video</p>
        </div>
        <div className="LV">
          <p>Live Video</p>
        </div>

        <span>X</span>
      </div>
      <div className="wrapper">
        <div className="content">
          <span className="material-icons-outlined profile">
            {" "}
            account_circle{" "}
          </span>
          <div
            placeholder="Write something here..."
            spellCheck="false"
            className="post_area"
            required
            contentEditable="true"
          >
            {source != "" ? <img src={source} alt="loading.." /> : null}
          </div>
          <div className="theme-emoji">
            <span className="material-icons-outlined emoj"> mood </span>
          </div>
        </div>
        <div className="opt">
          <div className="list_1">
            <div className="tgs">
              <span className="material-icons-outlined loyalty"> loyalty</span>
              <p>tag friends</p>
            </div>
            <div
              className="gif"
              onClick={() => {
                !isClicked ? setClicked(true) : setClicked(false);
              }}
            >
              <span className="material-icons-outlined gif_box">gif_box</span>
              <p>GIF</p>
            </div>
          </div>

          <div className="list_2">
            <div className="loc">
              <span className="material-icons-outlined location">
                location_on
              </span>
              <p>check in</p>
            </div>
            <div className="event">
              <span className="material-icons-outlined event_note">
                event_note
              </span>
              <p>tag event</p>
            </div>
          </div>
        </div>
        <div className="btns">
          <button className="btn_post_only">
            <span className="material-icons-outlined lock"> lock </span>Only me
          </button>
          <button className="btn_post">Post</button>
        </div>
      </div>
      {isClicked ? <GifyModel data={data} fn={getDta} fn2={getGIF} /> : null}
    </div>
  );
};

export default PostPage;
