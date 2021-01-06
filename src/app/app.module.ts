import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-intercptor.service';
import { combineLatest } from 'rxjs';
import { AddComponent } from './Usuario/add/add.component';
import { ListComponent } from './Usuario/list/list.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { NgxCurrencyModule } from 'ngx-currency';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appRouters: Routes = [
  {path : 'home', component : HomeComponent, canActivate : [GuardiaoGuard]},
  {path : 'login', component : LoginComponent},
  {path : '', component : LoginComponent},
  {path : 'listUser', component : ListComponent, canActivate : [GuardiaoGuard]},
  {path : 'addUser', component : AddComponent, canActivate : [GuardiaoGuard]},
  {path : 'addUser/:id', component : AddComponent, canActivate : [GuardiaoGuard]},
];

export const routes : ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    FormsModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
