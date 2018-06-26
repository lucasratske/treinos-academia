import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from './../../components/components.module';
import { CadastrarTreinoPage } from './cadastrar-treino';
import { MongoProvider } from '../../providers/mongo/mongo';

@NgModule({
  declarations: [
    CadastrarTreinoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarTreinoPage), ComponentsModule,
  ],
  providers: [
    MongoProvider
  ]
})
export class CadastrarTreinoPageModule {}
