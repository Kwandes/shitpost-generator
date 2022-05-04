import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { materialModules } from './material-modules.constant';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShitpostsComponent } from './pages/shitposts/shitposts.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { MatrixTerminalComponent } from './shared/components/matrix-terminal/matrix-terminal.component';
import { RadarComponent } from './shared/components/radar/radar.component';
import { TsParticlesComponent } from './shared/components/ts-particles/ts-particles.component';
import { authInterceptorProviders } from './shared/helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    ShitpostsComponent,
    TsParticlesComponent,
    RadarComponent,
    MatrixTerminalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    materialModules,
    NgParticlesModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
