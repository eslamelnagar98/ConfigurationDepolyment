import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { IStringManipulation } from 'src/app/models/StringManipulation';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { map } from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { EditStringManipulationComponent } from './edit-string-manipulation/edit-string-manipulation.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ArchitNode {
  id?:number,
  level: number,
  appOrHubId?:number,
  valueOrHubOrApp: string,
  fileName?: string,
  children: ArchitNode[],
  prev:ArchitNode|null
}
const treeData: IStringManipulation={
  AppID:1, HubID:2, AppName:"Order", HubName:"Egypt", FileName:"test.xml", OldConfigurationResult:""
}

                    let node1:ArchitNode =  {level: 1, valueOrHubOrApp: '<add key="NewLastName" value="Hassan ElPrince" />', children:[], prev:null}
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
export class StringManipulationComponent implements OnInit {

  treeControl = new NestedTreeControl<ArchitNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ArchitNode>();
  constructor(private matDialod:MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ArchitNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
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

  edit(node:ArchitNode){
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
    TREE_DATA.forEach(nodeLevel1=>{
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
  }
}

@Pipe({name: 'shortString'})
export class ShortString implements PipeTransform {
  transform(value: string): string {
    return (value.length > 50)? value.substr(0,50)+" ... " : value;
  }
}
