package com.GoliSoda.Controller;

import org.springframework.web.bind.annotation.*;
import com.GoliSoda.Service.*;
import org.springframework.http.*;
import com.GoliSoda.Entity.*;
import java.util.*;
import lombok.*;
import com.GoliSoda.DTO.*;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {

	private final OrderService orderService;

	@PostMapping
	public ResponseEntity<OrderResponseDTO> placeOrder(

			@RequestBody OrderDTO dto) {

		return ResponseEntity.ok(orderService.placeOrder(dto));
	}

	@GetMapping
	public ResponseEntity<List<Order>> getAllOrders() {

		return ResponseEntity.ok(orderService.getAllOrders());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long id) {

		return ResponseEntity.ok(orderService.getOrderById(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteOrder(@PathVariable Long id) {

		orderService.deleteOrder(id);

		return ResponseEntity.ok("Order deleted successfully");
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<Order> updateStatus(

			@PathVariable Long id,

			@RequestParam OrderStatus status) {

		return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
	}
}