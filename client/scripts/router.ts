/*
Name: Brody Dentinger
Date: March 16 , 2024
Description: This is our javascript for the path routing of our site.
File: router.js
*/

"use strict";

namespace core{

    export class Router{

        private _activeLink:string;
        private _routingTable:string[];
        private _linkData:string;

        constructor(){
            // active link holds the current route
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }

        public get ActiveLink():string{
            return this._activeLink;
        }

        public set ActiveLink(link:string){
            this._activeLink = link;
        }

        public get LinkData():string{
            return this._linkData;
        }

        public set LinkData(link:string){
            this._linkData = link;
        }

        /**
         * This method adds a new route to the routing table.
         * @param router
         *
         */
        public Add(router:string){
            this._routingTable.push();
        }

        /**
         * This method replaces the reference for the routing table with a new one.
         * @param routingTable
         *
         *
         */
        public AddTable(routingTable:string[]):void{
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the routing table
         * or -1 if the route does not exist.
         * @param route
         * @return {*}
         *
         */
        public Find(route:string):number{
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it
         * succeeds (delete a route), false otherwise.
         * @param route
         * @return {boolean}
         */
        public Remove(route:string):boolean{
            if(this.Find(route) > -1){
                // shouldn't this be 0??
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            // WON'T THIS RETURN FALSE NO MATTER WHAT ??
            return false;
        }

        /**
         * This method returns the routing table contents in a comma delimited seperated string.
         * @return {string}
         */
        public toString():string{
            return this._routingTable.toString();
        }
    }
}

// Instantiate a new router
let router:core.Router = new core.Router();

// Add default routes to our routing table
router.AddTable([

    "/",
    "/home",
    "/services",
    "/products",
    "/contact",
    "/contact-list",
    "/login",
    "/register",
    "/edit",
    "/about"
]);

let route:string = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
                     ? ((route) === "/") ? "/home" : route.substring(1)
                     : ("404");