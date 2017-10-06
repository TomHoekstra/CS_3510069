import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { Routing } from './app-routing';
import { ServiceModule } from './services/module.service';
import { HttpModule } from '@angular/http';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { GrowlModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    GrowlModule,
    HttpModule,
    BrowserModule,
    AccountModule,
    Routing,
    ServiceModule,
    StudentModule,
    AdminModule,
    BrowserAnimationsModule 
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
