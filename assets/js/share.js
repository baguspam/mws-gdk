

  function btnShare(){
    //window.addEventListener('load', function() {
      if(!navigator.share) {
        console.log('Web Share API not supported in this browser');
        alert('Web Share API not supported in this browser');
        return;
      }else{
        navigator.share({
          title: 'MWS - Bagus Pambudi',
          text: 'Mobile Web Spesialist from Google and Inixindo',
          url: 'https://mws-maspamz.firebaseapp.com/',
        });
      } 
    //});
  };

