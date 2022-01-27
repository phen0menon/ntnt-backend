import { Global, Module } from '@nestjs/common';

import * as providers from './providers';
import * as gateways from './gateways';

@Global()
@Module({
  providers: [...Object.values(providers), ...Object.values(gateways)],
  exports: [...Object.values(providers), ...Object.values(gateways)],
})
export class CommonModule {}
