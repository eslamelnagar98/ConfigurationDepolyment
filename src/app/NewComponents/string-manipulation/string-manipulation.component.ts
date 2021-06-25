import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { IStringManipulation } from 'src/app/models/StringManipulation';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { map } from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { EditStringManipulationComponent } from './edit-string-manipulation/edit-string-manipulation.component';
import { StringManipulationService } from 'src/app/Services/string-manipulation.service';
import { Subscription } from 'rxjs';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
class ArchitNode {
  //id?:number;
  //fileName?: string;
  //appOrHubId?:number;
  /*level: number;
  valueOrHubOrApp: string;
  children: ArchitNode[];
  prev:ArchitNode|null*/
  constructor(public level:number, public valueOrHubOrApp: string,
       public children: ArchitNode[], public prev:ArchitNode|null,
       public fileName?: string,
       public appOrHubId?:number){}
}
const treeData: IStringManipulation={
  AppID:1, HubID:2, AppName:"Order", HubName:"Egypt", FileName:"test.xml", OldConfigurationResult:""
}

                    let node1:ArchitNode =  {level: 1, valueOrHubOrApp: '<add key="NewLastName" value="Hassan ElPrince" /><add key="NewLastName" value="Hassan ElPrince" />', children:[], prev:null}
                    let node2:ArchitNode =  {level: 2, valueOrHubOrApp: 'Egypt', appOrHubId:1, children:[], prev:null}
                    let node3:ArchitNode =  {level: 3, valueOrHubOrApp: 'Order', appOrHubId:1, fileName:"test.xml", children:[], prev:null}
                    node1.children.push(node2);
                    node2.children.push(node3);
                    node2.prev = node1;
                    node3.prev = node2;

const TREE_DATA: ArchitNode[] = [node1]
/*[
  {
    id:1,
    level: 1,
    valueOrHubOrApp: '<add key="NewLastName" value="Hassan ElPrince" />',
    children: [
      {
        id:1,
        level: 2,
        appOrHubId:1,
        valueOrHubOrApp: "Egypt",
        children:[{
          id:1,
          appOrHubId:2,
          level: 3,
          valueOrHubOrApp: "Order",
          fileName:"test.xml"
        }]
      }
    ]
  },
  {
    id:2,
    level: 1,
    valueOrHubOrApp: '<add key="NewLastName" value="Hassan ElPrince" />',
    children: [
      {
        id:2,
        level: 2,
        appOrHubId:3,
        valueOrHubOrApp: "Egypt",
        children:[{
          id:2,
          level: 3,
          appOrHubId:3,
          valueOrHubOrApp: "Order",
          fileName:"test.xml"
        }]
      }
    ]
  },
  {
    id:3,
    level: 1,
    valueOrHubOrApp: '<add key="NewLastName" value="Hassan ElPrince" />',
    children: [
      {
        id:3,
        level: 2,
        valueOrHubOrApp: "Egypt",
        children:[{
          id:3,
          level: 3,
          valueOrHubOrApp: "Order",
          fileName:"test.xml"
        }]
      }
    ]
  }
];*/

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  valueOrHubOrApp: string;
  fileName?: string;
  level: number;
}

@Component({
  selector: 'app-string-manipulation',
  templateUrl: './string-manipulation.component.html',
  styleUrls: ['./string-manipulation.component.css']
})
export class StringManipulationComponent implements OnInit, OnDestroy {

  //treeControl = new NestedTreeControl<ArchitNode>(node => node.children);
  //dataSource = new MatTreeNestedDataSource<ArchitNode>();
  subscription!:Subscription ;
  key:string="";
  isFirstTime:boolean=true;
  constructor(private matDialod:MatDialog, private stringManipulationService:StringManipulationService) {
    //this.dataSource.data = TREE_DATA;
  }
  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  hasChild = (_: number, node: ArchitNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {

    
  }

  theSolver:IStringManipulation[]=[]
  //ss!:ArchitNode;
  mapDataSource:Map<string, Map<number,any[]>>=new Map(); //any is IStringManipulation
  search(){
    //if(this.subscription != null)
     // this.subscription.unsubscribe();
      
    this.subscription =this.stringManipulationService.getValuesByKey(this.key).subscribe(
      {next: (data)=>{
        this.theSolver =data;
        data.forEach(d=>{
          if(this.mapDataSource.has(d.OldConfigurationResult)){
            let seconMap = this.mapDataSource.get(d.OldConfigurationResult)!;
            if(seconMap.has(d.HubID))
              seconMap.get(d.HubID)?.push(d);
            else
              seconMap.set(d.HubID, [d]);
          }else
            this.mapDataSource.set(d.OldConfigurationResult, (new Map()).set(d.HubID, [d]) );
        })
        console.log(this.mapDataSource)
      },
      error:(err)=> console.log(err),
      complete:()=>{console.log(this.mapDataSource) ,
        this.isFirstTime = false
      } } )
  }
 /*constructor() { this.dataSource.data = TREE_DATA; }
  private _transformer = (node: ArchitNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      valueOrHubOrApp: node.valueOrHubOrApp,
      fileName : node.fileName,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;*/

  edit(stringManipulation:IStringManipulation){
    let _stringManipulate:IStringManipulation[] = [stringManipulation];
    
    this.matDialod.open(EditStringManipulationComponent, {
      height: '90%',
      width: '70%',
      data:{stringManipulate:_stringManipulate}});
  }
  editBranch(stringManipulations:IStringManipulation[]){
    let _stringManipulate:IStringManipulation[] = stringManipulations;
    
    this.matDialod.open(EditStringManipulationComponent, {
      height: '90%',
      width: '70%',
      data:{stringManipulate:_stringManipulate}});
  }
  editHubBranch(map :Map<number,IStringManipulation[]>){
    let _stringManipulate:IStringManipulation[] = [];
    map.forEach((value: IStringManipulation[]) => {
      value.forEach(v=> _stringManipulate.push(v));
    });
    this.matDialod.open(EditStringManipulationComponent, {
      height: '90%',
      width: '70%',
      data:{stringManipulate:_stringManipulate}});
  }
  editAll(){
    let _stringManipulate:IStringManipulation[] = [];
    this.mapDataSource.forEach((map: Map<number,IStringManipulation[]>) => {
      map.forEach((value: IStringManipulation[]) => {
        value.forEach(v=> _stringManipulate.push(v));
      });
    });
    
    this.matDialod.open(EditStringManipulationComponent, {
      height: '90%',
      width: '70%',
      data:{stringManipulate:_stringManipulate}});
  }

  /*edit(node:ArchitNode){
     console.log(node);
     let level3 = {AppName: node.valueOrHubOrApp, AppID:node.appOrHubId!, FileName:node.fileName!}
     node = node.prev!;
     let level2 = {HubName:node.valueOrHubOrApp, HubID:node.appOrHubId!}
     node = node.prev!;
     let level1 = {OldConfigurationResult:node.valueOrHubOrApp}
    let stringManipulate:IStringManipulation[] = [{...level1, ...level2, ...level3}]
    let Info:{hubs:string[], applications:string[], value:string}[] = []
    Info.push({hubs:[stringManipulate[0].HubName], applications:[stringManipulate[0].AppName], value:stringManipulate[0].OldConfigurationResult})
    console.log(stringManipulate);
    this.matDialod.open(EditStringManipulationComponent, {
            height: '90%',
            width: '70%',
            data:{stringManipulate:stringManipulate, Info:Info}});
  }

  editBranch(node:ArchitNode){
    let stringManipulate:IStringManipulation[]=[];
    let Info:{hubs:string[], applications:string[], value:string}[] = []
    let hubsName:string[]=[];
    let appsName:string[]=[];
    if(node.level == 2){
      hubsName.push(node.valueOrHubOrApp);
      let nodePrev = node.prev!;
      node.children.forEach(child=>{
        stringManipulate.push({OldConfigurationResult:nodePrev.valueOrHubOrApp, HubName:node.valueOrHubOrApp, HubID:node.appOrHubId!, AppName: child.valueOrHubOrApp, AppID:child.appOrHubId!, FileName:child.fileName!});
        appsName.push(child.valueOrHubOrApp);
      })
      console.log(stringManipulate);
    }else{
      node.children.forEach(childLevel2=>{
        hubsName.push(childLevel2.valueOrHubOrApp);
        childLevel2.children.forEach(childLevel3=>{
          stringManipulate.push({OldConfigurationResult:node.valueOrHubOrApp, HubName:childLevel2.valueOrHubOrApp, HubID:childLevel2.appOrHubId!, AppName: childLevel3.valueOrHubOrApp, AppID:childLevel3.appOrHubId!, FileName:childLevel3.fileName!});
          appsName.push(childLevel3.valueOrHubOrApp);
        })
      })
      console.log(stringManipulate);
    }
    Info.push(({hubs:hubsName, applications:appsName, value:stringManipulate[0].OldConfigurationResult}));
    this.matDialod.open(EditStringManipulationComponent, {
          height: '90%',
          width: '70%',
          data:{stringManipulate:stringManipulate, Info:Info}});
  }
  editAllBranches(){
    let stringManipulate:IStringManipulation[]=[];
    let Info:{hubs:string[], applications:string[], value:string}[] = []
    let hubsName:string[]=[];
    let appsName:string[]=[];
    this.dataSource.data.forEach(nodeLevel1=>{
      hubsName = [];
      appsName = [];
      nodeLevel1.children.forEach(nodeLevel2=>{
        hubsName.push(nodeLevel2.valueOrHubOrApp);
        nodeLevel2.children.forEach(nodeLevel3=>{
          stringManipulate.push({OldConfigurationResult:nodeLevel1.valueOrHubOrApp, HubName:nodeLevel2.valueOrHubOrApp, HubID:nodeLevel2.appOrHubId!, AppName: nodeLevel3.valueOrHubOrApp, AppID:nodeLevel3.appOrHubId!, FileName:nodeLevel3.fileName!});
          appsName.push(nodeLevel3.valueOrHubOrApp);
        })
      })
      Info.push({hubs:hubsName, applications:appsName, value:nodeLevel1.valueOrHubOrApp});
    })

    this.matDialod.open(EditStringManipulationComponent, {
      height: '90%',
      width: '70%',
      data:{stringManipulate:stringManipulate, Info:Info}});

      
  }*/

  tt(x:any){
    
    //console.log(x.parentElement?.parentElement?.parentElement.style)
    //console.log(x.parentElement?.parentElement.nextElementSibling.nextElementSibling)
    if(x.textContent == "chevron_right"){
      x.textContent = "expand_more";
      x.parentElement!.parentElement.nextElementSibling.nextElementSibling.style!.display ="block";
    }else{
      x.textContent = "chevron_right";
      x.parentElement!.parentElement.nextElementSibling.nextElementSibling.style!.display ="none";
    }
  }

}

@Pipe({name: 'shortString'})
export class ShortString implements PipeTransform {
  transform(value: string): string {
    return (value.length > 50)? value.substr(0,50)+" ... " : value;
  }
}


@Pipe({name: 'getValue'})
export class GetValue implements PipeTransform {
  transform(value: Map<number,IStringManipulation[]>, all:boolean=false): string {
    let str = value.values().next().value[0].oldConfigurationResult;
    if(all)
      return str;
    //console.log(value.values().next().value[0]) 
    return (str.length > 70)? str.substr(0,70)+" ... " : str;
  }
}

@Pipe({name: 'getHubName'})
export class GetHubName implements PipeTransform {
  transform(value: any[]): string {
    console.log(value[0].hubName)
    return value[0].hubName;
  }
}