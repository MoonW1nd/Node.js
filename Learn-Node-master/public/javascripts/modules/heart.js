import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      const hearted = this.heart.classList.toggle('heart__button--hearted');
      $('.heart-count').textContent = res.data.hearts.length;
      if (hearted) {
        this.heart.classList.add('heart__button--float');
        // this method in video for deleted class
        // setTimeout(() => this.heart.classList.remove('heart__button--float'), 2500);
      } else {
        this.heart.classList.remove('heart__button--float');
      }
    })
    .catch(console.error)
}

export default  ajaxHeart;