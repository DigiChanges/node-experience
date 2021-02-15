import {IBaseRepository} from "@digichanges/shared-experience";
import IRoleDomain from "../IDomain/IRoleDomain";

interface IRoleRepository extends IBaseRepository
{
    getBySlug(slug: string): Promise<IRoleDomain>;
}

export default IRoleRepository;
