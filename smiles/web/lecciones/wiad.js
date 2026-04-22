import $ from 'jquery';

if (!$('#wiad_styles').length) {
  $('<style id="wiad_styles">').text(`
    .wi_ad_link { padding:0!important; border:none!important; background:transparent!important; overflow:hidden; display:block; width:100%; max-width:300px; height:600px; opacity:0.9!important; transition:all 0.3s ease; }
    .wi_ad_link:hover { opacity:1!important; transform:scale(1.02); }
    .wi_ad_img { width:100%; height:100%; object-fit:cover; border-radius:1vh; display:block; }
  `).appendTo('head');
}

export const adLeft = `
  <div class="lc_ad_side lc_ad_l">
    <a href="https://lovewi.web.app/" target="_blank" class="lc_ad_box wi_ad_link">
      <img src="${import.meta.env.BASE_URL}Img0.webp" alt="Ad Left" class="wi_ad_img" />
    </a>
  </div>
`;

export const adRight = `
  <div class="lc_ad_side lc_ad_r">
    <a href="https://wtaype.me/" target="_blank" class="lc_ad_box wi_ad_link">
      <img src="${import.meta.env.BASE_URL}Img1.webp" alt="Ad Right" class="wi_ad_img" />
    </a>
  </div>
`;
