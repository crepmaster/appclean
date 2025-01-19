import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Exchange, ExchangeStatus } from "~/core/models/exchange.model";
import { ExchangeService } from "~/core/services/exchange/exchange.service";
import { AuthService } from "~/core/services/auth/auth.service";

@Component({
    moduleId: module.id,
    selector: "ns-exchange",
    templateUrl: "./exchange.component.html",
    styleUrls: ["./exchange.component.css"],
    standalone: false
})
export class ExchangeComponent implements OnInit {
    exchanges: Exchange[] = [];
    isLoading = false;
    errorMessage = "";
    currentUserId: string | undefined;

    constructor(
        private exchangeService: ExchangeService,
        private authService: AuthService
    ) {
        this.currentUserId = this.authService.getCurrentUser()?.id;
    }

    ngOnInit() {
        this.loadExchanges();
    }

    loadExchanges() {
        this.isLoading = true;
        this.errorMessage = "";

        this.exchangeService.getExchanges().subscribe({
            next: (exchanges) => {
                this.exchanges = exchanges;
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = "Failed to load exchanges";
                this.isLoading = false;
                console.error("Exchange error:", error);
            }
        });
    }

    onAcceptExchange(exchange: Exchange) {
        this.isLoading = true;
        this.exchangeService.updateExchangeStatus(exchange.id, ExchangeStatus.ACCEPTED)
            .subscribe({
                next: (updatedExchange) => {
                    const index = this.exchanges.findIndex(e => e.id === updatedExchange.id);
                    if (index !== -1) {
                        this.exchanges[index] = { ...this.exchanges[index], ...updatedExchange };
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = "Failed to accept exchange";
                    this.isLoading = false;
                }
            });
    }

    onRejectExchange(exchange: Exchange) {
        this.isLoading = true;
        this.exchangeService.updateExchangeStatus(exchange.id, ExchangeStatus.REJECTED)
            .subscribe({
                next: (updatedExchange) => {
                    const index = this.exchanges.findIndex(e => e.id === updatedExchange.id);
                    if (index !== -1) {
                        this.exchanges[index] = { ...this.exchanges[index], ...updatedExchange };
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = "Failed to reject exchange";
                    this.isLoading = false;
                }
            });
    }

    isOwner(exchange: Exchange): boolean {
        return exchange.offeringPharmacyId === this.currentUserId;
    }
}
