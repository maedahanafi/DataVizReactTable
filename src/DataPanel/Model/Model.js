import React from 'react';
import Application from './Application';
import Table from './Table';

class Model {
    constructor(updateGlobalStore){
        this.table = new Table('table', updateGlobalStore);
        this.application = new Application('application', updateGlobalStore);

        this.setCurrentModule = this.setCurrentModule.bind(this);
        this.setWorkflowIndex = this.setWorkflowIndex.bind(this);

    }

    /******************************************** Multi object interactions **********************************************/
    setCurrentModule(moduleName){
        if(moduleName == this.table.moduleName){
            this.table.clearTable(null);
            this.application.showAllExplanations();
        }else {
            this.table.updateTable(this.application.workflowIndex, moduleName, this.application.outputPercentLabeled, ()=>{});
            this.application.showModuleExplanations(moduleName);
        }
    }

    setWorkflowIndex(index){
        this.table.clearTable(null);
        this.application.setWorkflowIndex(index);

        //load new workflow
        if(this.application.workflowPanel.isEnable) {
            if (this.application.workflowPanel.isCompactVis) {
                this.application.setWorkflowPanelToLoad();
                this.compactWorkflow.loadWorkflow(index, this.application.outputPercentLabeled,() => {
                    this.application.setWorkflowPanelDoneLoad();
                });
            } else {
                this.application.setWorkflowPanelToLoad();
                this.workflow.loadWorkflow(index, this.application.outputPercentLabeled,() => {
                    const workflowPanel = this.application.workflowPanel;
                    if (workflowPanel.width && workflowPanel.height) {
                        this.workflow.resizeGraph(workflowPanel.width, workflowPanel.height);
                    }
                    this.application.setWorkflowPanelDoneLoad();
                });
            }
        }

        //load new explanations
        this.explanations.loadAllExplanations(index, this.application.explanationPanel.isGlobalScore, this.application.outputPercentLabeled);
        this.application.showAllExplanations();
    }
}

export default Model;