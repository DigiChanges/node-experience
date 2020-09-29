import {Document} from "mongoose";
import IFileDomain from "../../IDomain/IFileDomain";

interface IFileDocument extends Document, IFileDomain {}

export default IFileDocument;
