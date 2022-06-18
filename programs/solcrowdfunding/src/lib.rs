use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solcrowdfunding {
    use super::*;

    pub fn cerate(ctx: Context<Create>, name: String, description: String) -> Result<()> {
        let campaign  = &mut ctx.accounts.campaign;
        campaign.name = nanme;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.amdmin = *ctx.accounts.user.key;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=9000, seeds=[b"CAMPAIGN_DEMO".as_ref(), user.key().as_ref()], bump)]
    pub campaign: Account<'inf, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

