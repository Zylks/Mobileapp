import { Component, OnInit } from '@angular/core';
// Las clases Router y NavigationExtras son necesarias para que la página login le pase
// el nombre de usuario a la página home
import { Router, NavigationExtras } from '@angular/router';
// La clase ToastController sirve para mostrar mensajes emergente que duran un par de segundos
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Animation, AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  /*
    Se genera el modelo user con dos claves (key), las que se comportan como propiedades
    de la clase LoginPage.
    En Modelo MVC, la clase "LoginPage" viene siendo el "Controlador", encargado de administrar
    la parte gráfica de la página web de login, por lo que trabaja coordinado con el
    archivo login.page.html
    Cada propiedad tiene su valor inicial y tiene su pareja de control HTML que es el <ion-input>
    De este modo el TAG:
    <ion-input type="text" [(ngModel)]="login.Usuario"></ion-input>
    ya sabe que tiene que trabajar con el modelo de Angular a través de la
    propiedad "login.Usuario".
    Fijarse que si se le colocan valores inicion iales a login.usuario y login.password,
    estos aparecerán inmediatamente reflejados en la página login cuando esta
    se abra por primera vez.
  */

  public usuario: Usuario;
  /*
    Para poder trabajar con Router y poder navegar hacia la página "home", debemos primero pasar como
    parámetro e instanciar un objeto de la clase "Router". Fijarse que el tipo de dato, que se pasa en el constructor
    es "Router" con mayúscula, porque se trata de una clase y éstas parten con letra mayúscula,
    mientras que "router" con minúscula es el objeto de esa clase, que usaremos para ejecutar el método "navigate".
  */
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

  public ngOnInit(): void {

    /*
      Las siguientes 3 líneas de código sirven para lo siguiente:
        Caso 1: Si las comentas, la página quedará lista para ingresar el nombre de usuario y la password
        Caso 2: Si dejas las instrucciones sin comentar, entonces entrará inmediatamente a la página home,
          usando el usuario por defecto "cgomezvega" con la password "123". Lo anterior es muy útil
          para el caso en que ya quedó lista la página de login y me interesa probar las otras páginas,
          de este modo se saltará el login y no tendrás que estar digitando los datos todo el tiempo.
    */
    //  this.usuario.nombreUsuario = 'cgomez';
    //  this.usuario.password = '5678';
    //  this.ingresar();
  }

  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenido!');

    /*
      Se declara e instancia un objeto de la clase NavigationExtras, para poder pasarle parámetros a la página home.
      Al objeto json "state" se le asigna un objeto con nombre de clave "login" y el valor "this.login", de modo que
      le pase la cuenta de usuario y su password a la página home.

      Nótese que al enviar this.login, realmente se está enviando los valores que el usuario digitó en las cajas de input,
      pues gracias a la directiva [(ngModel)]="login.usuario", el programa sabe que hay una relación directa de unión entre
      el valor de la propiedad login.usuario y el valor del control gráfico que lleva este mismo nombre.
    */
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
  }

  /*
    Usaremos validateModel para verificar que se cumplan las validaciones de los campos del formulario
  */
  public validarUsuario(usuario: Usuario): boolean {

    const mensajeError = usuario.validarUsuario();

    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    return true;
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
