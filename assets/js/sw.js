/*if (!('serviceWorker' in navigator)) { 
  console.log('Browser tidak mendukung Service worker');
}
else{
   navigator.serviceWorker.register('../../service-worker.js').then(function() {
     console.log('Service Worker terdaftar (registered)');
   }).catch(function(error) {
     console.log('Error: Gagal melakukan registrasi service workder:', error);
   });
}*/
if ('serviceWorker' in navigator) { 
  navigator.serviceWorker.register('../../service-worker.js').then(function() {
     console.log('Service Worker terdaftar (registered)');
   }).catch(function(error) {
     console.log('Error: Gagal melakukan registrasi service workder:', error);
   });
}