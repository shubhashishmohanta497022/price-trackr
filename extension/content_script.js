(function(){
  function injectButton(){
    const btn = document.createElement("button");
    btn.textContent = "Track price";
    Object.assign(btn.style, { position:"fixed", bottom:"16px", right:"16px", zIndex: 2147483647, padding:"10px 14px", background:"#2563eb", color:"#fff", border:"0", borderRadius:"6px", cursor:"pointer", boxShadow:"0 2px 6px rgba(0,0,0,0.2)" });
    btn.onclick = () => {
      chrome.runtime.sendMessage({ type: "track", url: location.href });
    };
    document.body.appendChild(btn);
  }
  if (document.readyState === "complete" || document.readyState === "interactive") injectButton();
  else document.addEventListener("DOMContentLoaded", injectButton);
})();
